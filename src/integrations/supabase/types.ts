export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      cases: {
        Row: {
          address: string | null
          archived: boolean
          cad_versions: Json | null
          cancelled: boolean
          created_at: string
          customer: string | null
          dispatched_gigi: boolean
          dispatched_mokdae: boolean
          dispatched_sangpan: boolean
          gigi_final_date: string | null
          id: string
          manager: string | null
          mokdae_claims: Json | null
          mokdae_confirmed_at: string | null
          mokdae_consumer_approved: boolean
          mokdae_final_date: string | null
          mokdae_production_started: boolean
          mokdae_production_started_at: string | null
          mokdae_uploaded_files: Json | null
          mokdae_versions: Json | null
          phone: string | null
          sangpan_claims: Json | null
          sangpan_confirmed_at: string | null
          sangpan_consumer_approved: boolean
          sangpan_drawing_versions: Json | null
          sangpan_final_date: string | null
          sangpan_production_started: boolean
          sangpan_production_started_at: string | null
          sangpan_uploaded_files: Json | null
          sangpan_versions: Json | null
          schedule: Json
          silcheuk_eng_response: Json | null
          silcheuk_final_date: string | null
          silcheuk_final_time: string | null
          silcheuk_finalized: boolean
          silcheuk_proposals: Json
          silcheuk_result_done: boolean
          silcheuk_sent: boolean
          silcheuk_upload_result: Json | null
          status: Json
          updated_at: string
        }
        Insert: {
          address?: string | null
          archived?: boolean
          cad_versions?: Json | null
          cancelled?: boolean
          created_at?: string
          customer?: string | null
          dispatched_gigi?: boolean
          dispatched_mokdae?: boolean
          dispatched_sangpan?: boolean
          gigi_final_date?: string | null
          id: string
          manager?: string | null
          mokdae_claims?: Json | null
          mokdae_confirmed_at?: string | null
          mokdae_consumer_approved?: boolean
          mokdae_final_date?: string | null
          mokdae_production_started?: boolean
          mokdae_production_started_at?: string | null
          mokdae_uploaded_files?: Json | null
          mokdae_versions?: Json | null
          phone?: string | null
          sangpan_claims?: Json | null
          sangpan_confirmed_at?: string | null
          sangpan_consumer_approved?: boolean
          sangpan_drawing_versions?: Json | null
          sangpan_final_date?: string | null
          sangpan_production_started?: boolean
          sangpan_production_started_at?: string | null
          sangpan_uploaded_files?: Json | null
          sangpan_versions?: Json | null
          schedule?: Json
          silcheuk_eng_response?: Json | null
          silcheuk_final_date?: string | null
          silcheuk_final_time?: string | null
          silcheuk_finalized?: boolean
          silcheuk_proposals?: Json
          silcheuk_result_done?: boolean
          silcheuk_sent?: boolean
          silcheuk_upload_result?: Json | null
          status?: Json
          updated_at?: string
        }
        Update: {
          address?: string | null
          archived?: boolean
          cad_versions?: Json | null
          cancelled?: boolean
          created_at?: string
          customer?: string | null
          dispatched_gigi?: boolean
          dispatched_mokdae?: boolean
          dispatched_sangpan?: boolean
          gigi_final_date?: string | null
          id?: string
          manager?: string | null
          mokdae_claims?: Json | null
          mokdae_confirmed_at?: string | null
          mokdae_consumer_approved?: boolean
          mokdae_final_date?: string | null
          mokdae_production_started?: boolean
          mokdae_production_started_at?: string | null
          mokdae_uploaded_files?: Json | null
          mokdae_versions?: Json | null
          phone?: string | null
          sangpan_claims?: Json | null
          sangpan_confirmed_at?: string | null
          sangpan_consumer_approved?: boolean
          sangpan_drawing_versions?: Json | null
          sangpan_final_date?: string | null
          sangpan_production_started?: boolean
          sangpan_production_started_at?: string | null
          sangpan_uploaded_files?: Json | null
          sangpan_versions?: Json | null
          schedule?: Json
          silcheuk_eng_response?: Json | null
          silcheuk_final_date?: string | null
          silcheuk_final_time?: string | null
          silcheuk_finalized?: boolean
          silcheuk_proposals?: Json
          silcheuk_result_done?: boolean
          silcheuk_sent?: boolean
          silcheuk_upload_result?: Json | null
          status?: Json
          updated_at?: string
        }
        Relationships: []
      }
      gigi_store: {
        Row: {
          case_id: string
          data: Json
          updated_at: string
        }
        Insert: {
          case_id: string
          data?: Json
          updated_at?: string
        }
        Update: {
          case_id?: string
          data?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gigi_store_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: true
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          brand: string | null
          category: string
          created_at: string
          id: string
          item_name: string
        }
        Insert: {
          brand?: string | null
          category: string
          created_at?: string
          id?: string
          item_name: string
        }
        Update: {
          brand?: string | null
          category?: string
          created_at?: string
          id?: string
          item_name?: string
        }
        Relationships: []
      }
      mokdae_store: {
        Row: {
          case_id: string
          data: Json
          updated_at: string
        }
        Insert: {
          case_id: string
          data?: Json
          updated_at?: string
        }
        Update: {
          case_id?: string
          data?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mokdae_store_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: true
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      sangpan_store: {
        Row: {
          case_id: string
          data: Json
          updated_at: string
        }
        Insert: {
          case_id: string
          data?: Json
          updated_at?: string
        }
        Update: {
          case_id?: string
          data?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sangpan_store_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: true
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_accounts: {
        Row: {
          approved: boolean
          created_at: string
          email: string
          id: string
          process_type: Database["public"]["Enums"]["process_type"]
          user_id: string
        }
        Insert: {
          approved?: boolean
          created_at?: string
          email: string
          id?: string
          process_type: Database["public"]["Enums"]["process_type"]
          user_id: string
        }
        Update: {
          approved?: boolean
          created_at?: string
          email?: string
          id?: string
          process_type?: Database["public"]["Enums"]["process_type"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      process_type: "engineer" | "factory" | "supplier" | "countertop"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      process_type: ["engineer", "factory", "supplier", "countertop"],
    },
  },
} as const
