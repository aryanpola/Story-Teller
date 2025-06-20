-- Fix for Row Level Security policies on users table
-- Run this in your Supabase SQL Editor

-- First, check if the insert policy exists
SELECT policyname, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;

-- Recreate policies with correct permissions
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Also ensure the trigger function exists and works
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, parent_name, children_names, role, api_key)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', ''), '{}', 'parent', 'sk-' || encode(gen_random_bytes(32), 'hex'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Verify the setup
SELECT 
  'Policies' as type,
  policyname as name,
  cmd as operation
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public'

UNION ALL

SELECT 
  'Triggers' as type,
  trigger_name as name,
  event_manipulation as operation
FROM information_schema.triggers 
WHERE event_object_table = 'users' AND trigger_schema = 'auth';
