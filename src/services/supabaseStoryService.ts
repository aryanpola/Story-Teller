import { supabase, type Story } from '../config/supabase'

export interface CreateStoryData {
  title: string
  content: string
  theme?: string
  characters?: string[]
  moral?: string
}

export interface UpdateStoryData {
  title?: string
  content?: string
  theme?: string
  characters?: string[]
  moral?: string
}

class SupabaseStoryService {
  async createStory(data: CreateStoryData): Promise<Story> {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Authentication required')
    }

    const { data: story, error } = await supabase
      .from('stories')
      .insert([{
        user_id: user.id,
        ...data
      }])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create story: ${error.message}`)
    }

    return story
  }

  async getUserStories(): Promise<Story[]> {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Authentication required')
    }

    const { data: stories, error } = await supabase
      .from('stories')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch stories: ${error.message}`)
    }

    return stories || []
  }

  async getStoryById(id: string): Promise<Story | null> {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Authentication required')
    }

    const { data: story, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Story not found
      }
      throw new Error(`Failed to fetch story: ${error.message}`)
    }

    return story
  }

  async updateStory(id: string, updates: UpdateStoryData): Promise<Story> {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Authentication required')
    }

    const { data: story, error } = await supabase
      .from('stories')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update story: ${error.message}`)
    }

    return story
  }

  async deleteStory(id: string): Promise<void> {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Authentication required')
    }

    const { error } = await supabase
      .from('stories')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      throw new Error(`Failed to delete story: ${error.message}`)
    }
  }

  async searchStories(query: string): Promise<Story[]> {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Authentication required')
    }

    const { data: stories, error } = await supabase
      .from('stories')
      .select('*')
      .eq('user_id', user.id)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to search stories: ${error.message}`)
    }

    return stories || []
  }
}

export const storyService = new SupabaseStoryService()
