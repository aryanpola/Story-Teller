import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { storyService } from '../services/supabaseStoryService';

const SimpleStoryCreator: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    genre: '',
    tags: '',
    isPublic: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!user) {
      setError('Please log in to create a story');
      return;
    }

    if (!formData.title || !formData.content) {
      setError('Please fill in title and content');
      return;
    }

    try {
      setIsLoading(true);
      
      const storyData = {
        title: formData.title,
        content: formData.content,
        genre: formData.genre || undefined,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : undefined,
      };

      await storyService.createStory(storyData);
      
      setSuccess('Story created successfully! 🎉');
      setTimeout(() => {
        navigate('/'); // Redirect to home page
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to create story');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-emerald-200 to-teal-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 shadow-xl border-4 border-emerald-300">
          <Sparkles className="h-8 w-8 text-emerald-600 mx-auto" />
        </div>
        <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Create Your Story! ✨
        </h1>
        <p className="text-lg text-gray-600 font-bold">
          Write an amazing story to share!
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-emerald-100 border-4 border-emerald-200 text-emerald-700 px-6 py-4 rounded-2xl mb-6 text-center shadow-lg">
          <p className="font-bold">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-rose-100 border-4 border-rose-200 text-rose-700 px-6 py-4 rounded-2xl mb-6 text-center shadow-lg">
          <p className="font-bold">{error}</p>
        </div>
      )}

      {/* Story Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl p-8 border-4 border-emerald-200">
        
        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-black mb-3" htmlFor="title">
            📚 Story Title
          </label>
          <input
            className="w-full px-4 py-3 text-lg border-4 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
            id="title"
            type="text"
            name="title"
            placeholder="Give your story a magical title..."
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Genre */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-black mb-3" htmlFor="genre">
            🎭 Genre (Optional)
          </label>
          <select
            className="w-full px-4 py-3 text-lg border-4 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">Choose a genre...</option>
            <option value="adventure">🏰 Adventure</option>
            <option value="fantasy">🧙‍♀️ Fantasy</option>
            <option value="mystery">🔍 Mystery</option>
            <option value="comedy">😄 Comedy</option>
            <option value="friendship">👫 Friendship</option>
            <option value="family">👨‍👩‍👧‍👦 Family</option>
          </select>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-black mb-3" htmlFor="tags">
            🏷️ Tags (Optional)
          </label>
          <input
            className="w-full px-4 py-3 text-lg border-4 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
            id="tags"
            type="text"
            name="tags"
            placeholder="dragon, princess, magic (separate with commas)"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        {/* Content */}
        <div className="mb-8">
          <label className="block text-gray-700 text-lg font-black mb-3" htmlFor="content">
            ✍️ Your Story
          </label>
          <textarea
            className="w-full px-4 py-3 text-lg border-4 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 min-h-[300px]"
            id="content"
            name="content"
            placeholder="Once upon a time..."
            value={formData.content}
            onChange={handleChange}
            rows={12}
          />
        </div>

        {/* Submit Button */}
        <button
          className={`w-full bg-gradient-to-r from-emerald-200 to-teal-200 hover:from-emerald-300 hover:to-teal-300 text-emerald-700 font-black py-4 px-6 rounded-2xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-3 border-4 border-emerald-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-600 border-t-transparent"></div>
              <span>Creating Story...</span>
            </>
          ) : (
            <>
              <Save className="h-6 w-6" />
              <span>Save My Story! 📖</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SimpleStoryCreator;
