
-- Add missing columns to cases table for full DB persistence
ALTER TABLE public.cases 
  ADD COLUMN IF NOT EXISTS silcheuk_upload_result jsonb DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS silcheuk_result_done boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS mokdae_versions jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS mokdae_uploaded_files jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS cad_versions jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS mokdae_consumer_approved boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS mokdae_confirmed_at text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS mokdae_claims jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS mokdae_production_started boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS mokdae_production_started_at text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS mokdae_final_date text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS sangpan_versions jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS sangpan_uploaded_files jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS sangpan_drawing_versions jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS sangpan_consumer_approved boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS sangpan_confirmed_at text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS sangpan_claims jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS sangpan_production_started boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS sangpan_production_started_at text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS sangpan_final_date text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS gigi_final_date text DEFAULT NULL;
