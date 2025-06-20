-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create users table
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  username text,
  avatar_url text,
  preferences jsonb default '{}',
  children_names text[] default '{}',
  role text default 'parent' check (role in ('parent', 'admin')),
  api_key text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create stories table
create table public.stories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  theme text,
  characters text[],
  moral text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create feedback table
create table public.feedback (
  id uuid default uuid_generate_v4() primary key,
  story_id uuid references public.stories(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.stories enable row level security;
alter table public.feedback enable row level security;

-- Create policies for users table
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy "Enable insert for authenticated users only" on public.users
  for insert with check (auth.uid() = id);

-- Create policies for stories table
create policy "Users can view own stories" on public.stories
  for select using (auth.uid() = user_id);

create policy "Users can insert own stories" on public.stories
  for insert with check (auth.uid() = user_id);

create policy "Users can update own stories" on public.stories
  for update using (auth.uid() = user_id);

create policy "Users can delete own stories" on public.stories
  for delete using (auth.uid() = user_id);

-- Create policies for feedback table
create policy "Users can view own feedback" on public.feedback
  for select using (auth.uid() = user_id);

create policy "Users can insert own feedback" on public.feedback
  for insert with check (auth.uid() = user_id);

create policy "Users can update own feedback" on public.feedback
  for update using (auth.uid() = user_id);

create policy "Users can delete own feedback" on public.feedback
  for delete using (auth.uid() = user_id);

-- Create function to handle user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, username, children_names, role, api_key)
  values (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'username', ''),
    '{}', 
    'parent', 
    'sk-' || encode(gen_random_bytes(32), 'hex')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create function to update updated_at timestamp
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger set_users_updated_at
  before update on public.users
  for each row execute procedure public.set_updated_at();

create trigger set_stories_updated_at
  before update on public.stories
  for each row execute procedure public.set_updated_at();

-- Create indexes for better performance
create index users_email_idx on public.users(email);
create index stories_user_id_idx on public.stories(user_id);
create index stories_created_at_idx on public.stories(created_at desc);
create index feedback_story_id_idx on public.feedback(story_id);
create index feedback_user_id_idx on public.feedback(user_id);

-- Additional RLS fixes and debugging
-- Drop and recreate the insert policy to ensure it's correct
drop policy if exists "Enable insert for authenticated users only" on public.users;
create policy "Enable insert for authenticated users only" on public.users
  for insert with check (auth.uid() = id);

-- Add a more permissive policy for the trigger function (needed for automatic user creation)
create policy "Enable insert for service_role" on public.users
  for insert with check (true);

-- Ensure RLS is enabled on all tables
alter table public.users enable row level security;
alter table public.stories enable row level security;
alter table public.feedback enable row level security;
