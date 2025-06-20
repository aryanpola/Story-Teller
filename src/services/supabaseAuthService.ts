import { supabase, type User } from '../config/supabase'

export interface RegisterData {
  email: string
  password: string
  fullName: string
  username?: string
}

export interface LoginData {
  email: string
  password: string
}

class SupabaseAuthService {
  async signUp(data: RegisterData) {
    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (authError) {
        throw new Error(authError.message)
      }

      if (!authData.user) {
        throw new Error('Failed to create user account')
      }      // 2. Create user profile in our users table
      const userProfile: Partial<User> = {
        id: authData.user.id,
        email: data.email,
        full_name: data.fullName,
        username: data.username,
      }

      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .insert([userProfile])
        .select()
        .single()

      if (profileError) {
        // Clean up auth user if profile creation fails
        await supabase.auth.admin.deleteUser(authData.user.id)
        throw new Error(`Failed to create user profile: ${profileError.message}`)
      }

      return {
        user: authData.user,
        profile: profileData,
        session: authData.session,
      }
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  async signIn(data: LoginData) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (authError) {
        throw new Error(authError.message)
      }

      if (!authData.user) {
        throw new Error('Login failed')
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError) {
        throw new Error(`Failed to load user profile: ${profileError.message}`)
      }

      return {
        user: authData.user,
        profile,
        session: authData.session,
      }
    } catch (error) {
      console.error('Signin error:', error)
      throw error
    }
  }

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        throw new Error(error.message)
      }

      if (!user) {
        return null
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('Failed to load user profile:', profileError)
        return null
      }

      return {
        user,
        profile,
      }
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  }

  async updateProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`)
    }

    return data
  }

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      throw new Error(error.message)
    }
  }

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      throw new Error(error.message)
    }
  }
  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

export const authService = new SupabaseAuthService()
