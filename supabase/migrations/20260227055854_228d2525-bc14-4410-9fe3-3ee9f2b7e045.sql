ALTER TABLE public.cases 
  ADD COLUMN IF NOT EXISTS dispatched_mokdae boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS dispatched_gigi boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS dispatched_sangpan boolean NOT NULL DEFAULT false;