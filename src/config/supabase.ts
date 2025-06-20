import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  username?: string
  full_name?: string
  avatar_url?: string
  preferences?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Story {
  id: string
  user_id: string
  title: string
  content: string
  genre?: string
  tags?: string[]
  is_public: boolean
  reading_time?: number
  created_at: string
  updated_at: string
}

export interface Feedback {
  id: string
  story_id: string
  user_id: string
  rating: number
  comment?: string
  created_at: string
}
