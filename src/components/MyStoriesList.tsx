import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Tag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { storyService } from '../services/supabaseStoryService';
import type { Story } from '../config/supabase';

const MyStoriesList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadStories();
    }
  }, [user]);

  const loadStories = async () => {
    try {
      setLoading(true);
      const userStories = await storyService.getUserStories();
      setStories(userStories);
    } catch (err: any) {
      setError(err.message || 'Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Please log in to see your stories.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent mx-auto"></div>
        <p className="text-lg text-gray-600 mt-4">Loading your stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-100 border-4 border-rose-200 text-rose-700 px-6 py-4 rounded-2xl text-center">
        <p className="font-bold">{error}</p>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-2xl font-black text-gray-700 mb-4">No Stories Yet!</h3>
        <p className="text-lg text-gray-600 mb-6">You haven't created any stories yet.</p>
        <a 
          href="/create-story" 
          className="inline-block bg-gradient-to-r from-emerald-200 to-teal-200 text-emerald-700 px-6 py-3 rounded-full font-black text-lg hover:from-emerald-300 hover:to-teal-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-emerald-300"
        >
          Create Your First Story! ✨
        </a>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-gray-800 mb-6 text-center">
        Your Stories 📖
      </h2>
      
      <div className="grid gap-6">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-2xl shadow-lg p-6 border-4 border-emerald-200 hover:shadow-xl transition-all duration-300">
            
            {/* Story Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-emerald-600" />
                <h3 className="text-xl font-black text-gray-800">{story.title}</h3>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{new Date(story.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Story Content Preview */}
            <div className="mb-4">
              <p className="text-gray-700 line-clamp-3">
                {story.content.substring(0, 200)}
                {story.content.length > 200 && '...'}
              </p>
            </div>

            {/* Story Metadata */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {story.genre && (
                  <span className="bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-3 py-1 rounded-full text-sm font-bold border-2 border-violet-200">
                    🎭 {story.genre}
                  </span>
                )}
                
                {story.tags && story.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {story.tags.slice(0, 2).join(', ')}
                      {story.tags.length > 2 && ` +${story.tags.length - 2} more`}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  story.is_public 
                    ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200' 
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-200'
                }`}>
                  {story.is_public ? '🌍 Public' : '🔒 Private'}
                </span>
              </div>
            </div>

            {/* Reading Time */}
            {story.reading_time && (
              <div className="mt-3 text-sm text-gray-500">
                📖 {story.reading_time} min read
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create New Story Button */}
      <div className="text-center mt-8">
        <a 
          href="/create-story" 
          className="inline-block bg-gradient-to-r from-emerald-200 to-teal-200 text-emerald-700 px-6 py-3 rounded-full font-black text-lg hover:from-emerald-300 hover:to-teal-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-emerald-300"
        >
          Write Another Story! ✨
        </a>
      </div>
    </div>
  );
};

export default MyStoriesList;
