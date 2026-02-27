import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as XLSX from "npm:xlsx@0.18.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse Excel/CSV
    const arrayBuffer = await file.arrayBuffer();
    const ext = file.name?.split(".").pop()?.toLowerCase() || "";
    let workbook;
    if (ext === "csv") {
      // CSV: decode as UTF-8 text, then parse
      const decoder = new TextDecoder("utf-8");
      const csvText = decoder.decode(new Uint8Array(arrayBuffer));
      workbook = XLSX.read(csvText, { type: "string" });
    } else {
      workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
    }
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: Record<string, string>[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Empty sheet" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Map columns: 소분류 → category, 브랜드 → brand, 건자재항목(드롭다운용) → item_name
    // Flexible header matching
    const headers = Object.keys(rows[0]);
    const findCol = (keywords: string[]) =>
      headers.find((h) => keywords.some((k) => h.includes(k))) || null;

    const categoryCol = findCol(["소분류", "카테고리", "category"]);
    const brandCol = findCol(["브랜드", "brand"]);
    const itemCol = findCol(["드롭다운", "건자재항목"]);

    if (!categoryCol || !itemCol) {
      return new Response(
        JSON.stringify({
          error: `필수 열을 찾을 수 없습니다. 소분류/건자재항목 열이 필요합니다. 발견된 열: ${headers.join(", ")}`,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Build insert data
    const materials = rows
      .filter((r) => r[categoryCol] && r[itemCol])
      .map((r) => ({
        category: String(r[categoryCol]).trim(),
        brand: brandCol ? String(r[brandCol]).trim() || null : null,
        item_name: String(r[itemCol]).trim(),
      }));

    if (materials.length === 0) {
      return new Response(JSON.stringify({ error: "유효한 데이터 행이 없습니다." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Clear existing data and insert new
    const { error: deleteError } = await supabase.from("materials").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (deleteError) {
      return new Response(JSON.stringify({ error: `삭제 실패: ${deleteError.message}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert in batches of 500
    const batchSize = 500;
    let inserted = 0;
    for (let i = 0; i < materials.length; i += batchSize) {
      const batch = materials.slice(i, i + batchSize);
      const { error: insertError } = await supabase.from("materials").insert(batch);
      if (insertError) {
        return new Response(JSON.stringify({ error: `삽입 실패: ${insertError.message}` }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      inserted += batch.length;
    }

    // Get categories summary
    const { data: categories } = await supabase
      .from("materials")
      .select("category")
      .order("category");

    const categoryCounts: Record<string, number> = {};
    (categories || []).forEach((r: { category: string }) => {
      categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
    });

    return new Response(
      JSON.stringify({
        success: true,
        totalInserted: inserted,
        categories: categoryCounts,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
