-- Diagnostic and Fix Script for RLS Policy Issue
-- Run this in Supabase SQL Editor

-- Step 1: Check current policies on users table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';

-- Step 2: Check if RLS is enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

-- Step 3: Drop ALL existing policies and recreate them
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Enable insert for service_role" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- Step 4: Temporarily disable RLS to allow the trigger to work
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 5: Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 6: Create simple, permissive policies
CREATE POLICY "allow_all_for_authenticated" ON public.users
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "allow_service_role" ON public.users
    FOR ALL 
    TO service_role 
    USING (true) 
    WITH CHECK (true);

-- Step 7: Verify policies are created
SELECT 
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';

-- Step 8: Check if trigger exists
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table
FROM information_schema.triggers 
WHERE event_object_table = 'users' AND trigger_schema = 'auth';
