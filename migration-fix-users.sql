-- Migration script to fix the users table structure
-- Run this in Supabase SQL Editor

-- First, drop the trigger to avoid issues
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop and recreate the function with correct column names
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Add the missing columns to existing users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS full_name text,
ADD COLUMN IF NOT EXISTS username text,
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS preferences jsonb default '{}';

-- Remove the old parent_name column if it exists
ALTER TABLE public.users DROP COLUMN IF EXISTS parent_name;

-- Make full_name not required (nullable)
ALTER TABLE public.users ALTER COLUMN full_name DROP NOT NULL;

-- Recreate the trigger function with correct columns
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, username, children_names, role, api_key)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'username', ''),
    '{}', 
    'parent', 
    'sk-' || encode(gen_random_bytes(32), 'hex')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;
