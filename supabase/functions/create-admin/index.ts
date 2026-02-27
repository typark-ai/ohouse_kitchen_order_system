import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "인증이 필요합니다." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify caller is an approved admin using their token
    const callerClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller }, error: callerError } = await callerClient.auth.getUser();
    if (callerError || !caller) {
      return new Response(JSON.stringify({ error: "유효하지 않은 인증입니다." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if caller is approved admin using service role (bypasses RLS)
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: callerAdmin } = await adminClient
      .from("admin_accounts")
      .select("approved")
      .eq("user_id", caller.id)
      .single();

    if (!callerAdmin?.approved) {
      return new Response(JSON.stringify({ error: "어드민 권한이 없습니다." }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse request body
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "이메일과 비밀번호를 입력해 주세요." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (password.length < 6) {
      return new Response(JSON.stringify({ error: "비밀번호는 6자 이상이어야 합니다." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create user with admin API (auto-confirmed)
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) {
      return new Response(JSON.stringify({ error: createError.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert into admin_accounts (approved = true)
    const { error: insertError } = await adminClient
      .from("admin_accounts")
      .insert({
        user_id: newUser.user.id,
        email: email,
        approved: true,
      });

    if (insertError) {
      return new Response(JSON.stringify({ error: "계정은 생성되었으나 어드민 등록 실패: " + insertError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, email }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
