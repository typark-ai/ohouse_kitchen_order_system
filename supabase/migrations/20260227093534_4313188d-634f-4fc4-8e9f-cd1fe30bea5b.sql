
-- Create admin_accounts table
CREATE TABLE public.admin_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_accounts ENABLE ROW LEVEL SECURITY;

-- Security definer function to check admin status (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.is_approved_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_accounts
    WHERE user_id = _user_id
      AND approved = true
  )
$$;

-- Function to check if admin_accounts table is empty (for first signup auto-approve)
CREATE OR REPLACE FUNCTION public.admin_accounts_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::integer FROM public.admin_accounts
$$;

-- RLS: Anyone can insert (for signup)
CREATE POLICY "Anyone can insert admin_accounts"
ON public.admin_accounts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- RLS: Users can read own account
CREATE POLICY "Users can read own admin account"
ON public.admin_accounts
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS: Approved admins can read all accounts (for admin management)
CREATE POLICY "Approved admins can read all admin accounts"
ON public.admin_accounts
FOR SELECT
TO authenticated
USING (public.is_approved_admin(auth.uid()));

-- RLS: Approved admins can update accounts (for approving others)
CREATE POLICY "Approved admins can update admin accounts"
ON public.admin_accounts
FOR UPDATE
TO authenticated
USING (public.is_approved_admin(auth.uid()))
WITH CHECK (public.is_approved_admin(auth.uid()));

-- RLS: Approved admins can delete accounts
CREATE POLICY "Approved admins can delete admin accounts"
ON public.admin_accounts
FOR DELETE
TO authenticated
USING (public.is_approved_admin(auth.uid()));
