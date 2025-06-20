import { supabase, type Feedback } from '../config/supabase'

export interface CreateFeedbackData {
  story_id: string
  rating: number
  comment?: string
}

export interface UpdateFeedbackData {
  rating?: number
  comment?: string
}

class SupabaseFeedbackService {
  async createFeedback(data: CreateFeedbackData): Promise<Feedback> {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Authentication required')
    }

    // Check if user already gave feedback for this story
    const { data: existingFeedback } = await supabase
      .from('feedback')
      .select('id')
      .eq('story_id', data.story_id)
      .eq('user_id', user.id)
      .single()

    if (existingFeedback) {
      throw new Error('You have already provided feedback for this story')
    }

    const { data: feedback, error } = await supabase
      .from('feedback')
      .insert([{
        user_id: user.id,
        ...data
      }])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create feedback: ${error.message}`)
    }

    return feedback
  }

  async getFeedbackForStory(storyId: string): Promise<Feedback[]> {
    const { data: feedback, error } = await supabase
      .from('feedback')
      .select('*')
      .eq('story_id', storyId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch feedback: ${error.message}`)
    }

    return feedback || []
  }

  async getUserFeedback(): Promise<Feedback[]> {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Authentication required')
    }

    const { data: feedback, error } = await supabase
      .from('feedback')
      .select(`
        *,
        stories (
          id,
          title
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch user feedback: ${error.message}`)
    }

    return feedback || []
  }

  async updateFeedback(id: string, updates: UpdateFeedbackData): Promise<Feedback> {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Authentication required')
    }

    const { data: feedback, error } = await supabase
      .from('feedback')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update feedback: ${error.message}`)
    }

    return feedback
  }

  async deleteFeedback(id: string): Promise<void> {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Authentication required')
    }

    const { error } = await supabase
      .from('feedback')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      throw new Error(`Failed to delete feedback: ${error.message}`)
    }
  }

  async getStoryAverageRating(storyId: string): Promise<number> {
    const { data, error } = await supabase
      .from('feedback')
      .select('rating')
      .eq('story_id', storyId)

    if (error) {
      throw new Error(`Failed to calculate average rating: ${error.message}`)
    }

    if (!data || data.length === 0) {
      return 0
    }

    const sum = data.reduce((acc, feedback) => acc + feedback.rating, 0)
    return sum / data.length
  }
}

export const feedbackService = new SupabaseFeedbackService()
