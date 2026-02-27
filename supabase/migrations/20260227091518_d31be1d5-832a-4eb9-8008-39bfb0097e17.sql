
-- Create enum for process types
CREATE TYPE public.process_type AS ENUM ('engineer', 'factory', 'supplier', 'countertop');

-- Create supplier_accounts table
CREATE TABLE public.supplier_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  process_type process_type NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.supplier_accounts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for signup)
CREATE POLICY "Anyone can insert supplier_accounts"
  ON public.supplier_accounts FOR INSERT
  WITH CHECK (true);

-- Users can read their own account
CREATE POLICY "Users can read own account"
  ON public.supplier_accounts FOR SELECT
  USING (auth.uid() = user_id);

-- Allow anon to read all (for admin dashboard - no auth on admin side currently)
CREATE POLICY "Anon can read all supplier_accounts"
  ON public.supplier_accounts FOR SELECT
  USING (true);

-- Allow anon to update (for admin approval)
CREATE POLICY "Anon can update supplier_accounts"
  ON public.supplier_accounts FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow anon to delete
CREATE POLICY "Anon can delete supplier_accounts"
  ON public.supplier_accounts FOR DELETE
  USING (true);
