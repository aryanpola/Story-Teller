# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication and PostgreSQL database for your storytelling app.

## Prerequisites

1. A Supabase account (free tier available at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. Your React app already set up

## Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - Name: `storytelling-app` (or any name you prefer)
   - Database Password: Generate a strong password and save it
   - Region: Choose the closest to your users
5. Click "Create new project"
6. Wait for the project to be set up (usually takes 2-3 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (something like `https://xxxxx.supabase.co`)
   - **Project API Key** (anon/public key)

## Step 3: Set Up Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`):

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Other existing variables...
PORT=3005
FRONTEND_URL=http://localhost:5173
GOOGLE_API_KEY=your_google_api_key_here
JWT_SECRET=your_jwt_secret_here
```

2. Replace the placeholder values with your actual Supabase credentials

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire content from `supabase-schema.sql` and paste it into the editor
4. Click "Run" to execute the SQL

This will create:
- `users` table for user profiles
- `stories` table for user stories
- `feedback` table for story feedback
- Row Level Security (RLS) policies
- Triggers for automatic user creation
- Indexes for better performance

## Step 5: Configure Authentication

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Configure the following:

### Site URL
- Add your development URL: `http://localhost:5173`
- For production, add your actual domain

### Email Templates (Optional)
- Customize the confirmation and password reset email templates
- Go to **Authentication** → **Email Templates**

### Providers (Optional)
- Enable additional auth providers like Google, GitHub, etc.
- Go to **Authentication** → **Providers**

## Step 6: Test the Setup

1. Install dependencies:
```bash
npm install
```

2. Start your development server:
```bash
npm run dev
```

3. Test the authentication:
   - Go to `/register` and create a new account
   - Check your email for confirmation (if email confirmation is enabled)
   - Try logging in with your credentials
   - Check the Supabase dashboard **Authentication** → **Users** to see your user

## Step 7: Row Level Security (RLS) Verification

The schema automatically sets up RLS policies, but you can verify:

1. Go to **Database** → **Tables** in Supabase dashboard
2. Check that RLS is enabled on `users`, `stories`, and `feedback` tables
3. Review the policies to ensure they match your security requirements

## Database Schema Overview

### Users Table
```sql
- id: UUID (references auth.users)
- email: Text (unique)
- parent_name: Text
- children_names: Text array
- role: Text (parent/admin)
- api_key: Text
- created_at: Timestamp
- updated_at: Timestamp
```

### Stories Table
```sql
- id: UUID (primary key)
- user_id: UUID (references users)
- title: Text
- content: Text
- theme: Text (optional)
- characters: Text array (optional)
- moral: Text (optional)
- created_at: Timestamp
- updated_at: Timestamp
```

### Feedback Table
```sql
- id: UUID (primary key)
- story_id: UUID (references stories)
- user_id: UUID (references users)
- rating: Integer (1-5)
- comment: Text (optional)
- created_at: Timestamp
```

## Security Features

1. **Row Level Security**: Users can only access their own data
2. **JWT Authentication**: Secure token-based authentication
3. **Email Verification**: Optional email confirmation for new users
4. **Password Reset**: Built-in password reset functionality
5. **Real-time Subscriptions**: Built-in support for real-time updates

## Migration from Current System

If you're migrating from an existing authentication system:

1. Export your current user data
2. Create a migration script to import users into Supabase
3. Update your existing API calls to use the new Supabase services
4. Test thoroughly before deploying to production

## Production Deployment

Before deploying to production:

1. Update environment variables in your hosting platform
2. Add your production domain to Supabase Site URL settings
3. Configure proper email templates
4. Set up proper database backups
5. Review and test all RLS policies
6. Enable email confirmation for production

## Troubleshooting

### Common Issues:

1. **Environment variables not loading**: Make sure your `.env` file is in the project root and restart your dev server

2. **Authentication errors**: Check that your Supabase URL and anon key are correct

3. **Database access errors**: Verify that RLS policies are set up correctly

4. **Email not sending**: Check your email configuration in Supabase settings

5. **CORS errors**: Make sure your site URL is added to Supabase settings

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com/)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## Next Steps

After setting up authentication, you can:

1. Implement story creation and management using `storyService`
2. Add feedback functionality using `feedbackService`
3. Set up real-time subscriptions for live updates
4. Add social authentication providers
5. Implement advanced features like story sharing

Your Supabase + PostgreSQL authentication system is now ready! 🎉
