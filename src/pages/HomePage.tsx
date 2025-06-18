import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, Sparkles, Heart, Rocket, TreePine, Users, BookOpen, Play } from 'lucide-react';
import axios from 'axios';

interface Story {
  _id: string;
  title: {
    en: string;
    [key: string]: string;
  };
  summary: {
    en: string;
    [key: string]: string;
  };
  thumbnailUrl: string;
  category: string;
  ageRange: string;
  stats: {
    views: number;
    averageRating: number;
  };
}

const HomePage: React.FC = () => {
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);
  const [recentStories, setRecentStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const categoryIcons = {
    fantasy: TreePine,
    adventure: Rocket,
    educational: BookOpen,
    friendship: Users,
    nature: TreePine,
    family: Heart,
    mystery: Sparkles
  };

  const categoryColors = {
    fantasy: 'from-violet-200 to-purple-200',
    adventure: 'from-sky-200 to-cyan-200',
    educational: 'from-emerald-200 to-teal-200',
    friendship: 'from-rose-200 to-pink-200',
    nature: 'from-green-200 to-emerald-200',
    family: 'from-orange-200 to-amber-200',
    mystery: 'from-indigo-200 to-violet-200'
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        
        console.log('Using mock data for demonstration');
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setFeaturedStories([
          {
            _id: '1',
            title: { en: 'The Magic Forest Adventure' },
            summary: { en: 'Join friendly animals on a magical journey through an enchanted forest full of surprises!' },
            thumbnailUrl: 'https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'fantasy',
            ageRange: '5-8',
            stats: { views: 120, averageRating: 4.8 }
          },
          {
            _id: '2',
            title: { en: 'Space Explorers' },
            summary: { en: 'Blast off to the stars with Captain Luna and discover amazing planets and friendly aliens!' },
            thumbnailUrl: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=400',
            category: 'adventure',
            ageRange: '7-10',
            stats: { views: 98, averageRating: 4.6 }
          },
          {
            _id: '3',
            title: { en: 'The Secret Garden' },
            summary: { en: 'Discover a magical garden where flowers sing and butterflies tell wonderful stories!' },
            thumbnailUrl: 'https://images.pexels.com/photos/414160/pexels-photo-414160.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'mystery',
            ageRange: '6-9',
            stats: { views: 85, averageRating: 4.5 }
          }
        ]);
        
        setRecentStories([
          {
            _id: '4',
            title: { en: 'The Brave Little Boat' },
            summary: { en: 'Sail across the big blue ocean with Boaty and meet amazing sea creatures!' },
            thumbnailUrl: 'https://images.pexels.com/photos/273886/pexels-photo-273886.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'adventure',
            ageRange: '3-6',
            stats: { views: 45, averageRating: 4.3 }
          },
          {
            _id: '5',
            title: { en: 'Dinosaur Friends' },
            summary: { en: 'Meet friendly dinosaurs and learn about their amazing world long, long ago!' },
            thumbnailUrl: 'https://images.pexels.com/photos/1304805/pexels-photo-1304805.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'educational',
            ageRange: '4-7',
            stats: { views: 72, averageRating: 4.4 }
          },
          {
            _id: '6',
            title: { en: 'The Flying Treehouse' },
            summary: { en: 'Zoom around the world in a magical treehouse that can fly anywhere you want!' },
            thumbnailUrl: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'fantasy',
            ageRange: '5-8',
            stats: { views: 64, averageRating: 4.2 }
          }
        ]);
        
        setError('');
        
      } catch (err) {
        console.error('Error:', err);
        setError('');
        // Set mock data for development
        setFeaturedStories([
          {
            _id: '1',
            title: { en: 'The Magic Forest Adventure' },
            summary: { en: 'Join friendly animals on a magical journey through an enchanted forest!' },
            thumbnailUrl: 'https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'fantasy',
            ageRange: '5-8',
            stats: { views: 120, averageRating: 4.8 }
          }
        ]);
        
        setRecentStories([
          {
            _id: '4',
            title: { en: 'The Brave Little Boat' },
            summary: { en: 'Sail across the big blue ocean with Boaty!' },
            thumbnailUrl: 'https://images.pexels.com/photos/273886/pexels-photo-273886.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'adventure',
            ageRange: '3-6',
            stats: { views: 45, averageRating: 4.3 }
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  const renderStoryCard = (story: Story, isFeatured = false) => {
    const CategoryIcon = categoryIcons[story.category as keyof typeof categoryIcons] || BookOpen;
    const categoryColor = categoryColors[story.category as keyof typeof categoryColors] || 'from-violet-200 to-purple-200';
    
    return (
      <Link 
        to={`/story/${story._id}`} 
        key={story._id} 
        className={`group block ${isFeatured ? 'md:flex' : ''} bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 border-transparent hover:border-amber-200 ${isFeatured ? 'mb-8' : 'mb-6'}`}
      >
        <div className={`relative ${isFeatured ? 'md:w-1/2' : 'w-full'} ${isFeatured ? 'h-64' : 'h-48'} overflow-hidden`}>
          <img 
            src={story.thumbnailUrl} 
            alt={story.title.en} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Category Badge */}
          <div className={`absolute top-4 right-4 bg-gradient-to-r ${categoryColor} text-gray-700 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 border-2 border-white/50`}>
            <CategoryIcon className="h-4 w-4" />
            <span className="font-bold text-sm capitalize">{story.category}</span>
          </div>
          
          {/* Age Badge */}
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-700 px-4 py-2 rounded-full shadow-lg border-2 border-white/50">
            <span className="font-bold text-sm">Ages {story.ageRange}</span>
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl border-4 border-violet-200">
              <Play className="h-8 w-8 text-violet-600" />
            </div>
          </div>
        </div>
        
        <div className={`p-6 ${isFeatured ? 'md:w-1/2' : ''} ${isFeatured ? 'md:p-8' : ''}`}>
          <h3 className={`${isFeatured ? 'text-2xl' : 'text-xl'} font-black mb-3 text-gray-800 group-hover:text-violet-600 transition-colors`}>
            {story.title.en}
          </h3>
          <p className={`text-gray-600 mb-4 ${isFeatured ? 'text-lg' : 'text-base'} leading-relaxed`}>
            {story.summary.en}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-amber-100 px-3 py-1 rounded-full border-2 border-amber-200">
                <Star className="h-4 w-4 text-amber-500 fill-current" />
                <span className="font-bold text-amber-700">{story.stats.averageRating.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1 bg-sky-100 px-3 py-1 rounded-full border-2 border-sky-200">
                <Eye className="h-4 w-4 text-sky-500" />
                <span className="font-bold text-sky-700">{story.stats.views}</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-violet-200 to-purple-200 text-violet-700 px-4 py-2 rounded-full font-bold text-sm group-hover:from-violet-300 group-hover:to-purple-300 transition-all border-2 border-violet-300">
              Read Story!
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <div className="bg-gradient-to-r from-rose-100 via-violet-100 to-sky-100 rounded-3xl p-12 mb-12 shadow-xl border-4 border-amber-200">
          <h1 className="text-6xl font-black bg-gradient-to-r from-violet-600 via-rose-600 to-sky-600 bg-clip-text text-transparent mb-6">
            Welcome to StoryLand! 🌟
          </h1>
          <p className="text-2xl text-gray-700 mb-8 font-bold">
            Where every story is an adventure waiting for YOU! ✨
          </p>
          <Link 
            to="/create-story" 
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-200 to-teal-200 text-emerald-700 px-8 py-4 rounded-full text-xl font-black hover:from-emerald-300 hover:to-teal-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-4 border-emerald-300"
          >
            <Sparkles className="h-6 w-6" />
            <span>Create Your Own Story!</span>
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-sky-100 to-violet-100 border-4 border-sky-200 text-sky-700 px-6 py-4 rounded-2xl mb-8 shadow-lg">
          <p className="font-bold text-lg">🎭 Demo Mode Active!</p>
          <p className="text-base">We're showing you some amazing sample stories. In the real version, there would be hundreds more!</p>
        </div>
      </section>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-8 border-violet-200 border-t-violet-400 mb-4"></div>
          <p className="text-2xl font-bold text-violet-600">Loading magical stories...</p>
        </div>
      ) : error ? (
        <div className="bg-rose-100 border-4 border-rose-300 text-rose-700 px-6 py-4 rounded-2xl mb-8 text-center">
          <p className="font-bold text-lg">{error}</p>
        </div>
      ) : (
        <>
          {/* Featured Stories */}
          <section className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <h2 className="text-4xl font-black text-center bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
                ⭐ Featured Adventures ⭐
              </h2>
            </div>
            <div className="space-y-8">
              {featuredStories.map(story => renderStoryCard(story, true))}
            </div>
          </section>
          
          {/* Recent Stories */}
          <section className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <h2 className="text-4xl font-black text-center bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                🆕 Brand New Stories 🆕
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentStories.map(story => renderStoryCard(story))}
            </div>
          </section>
        </>
      )}
      
      {/* How It Works Section */}
      <section className="bg-gradient-to-r from-amber-100 via-rose-100 to-violet-100 p-12 rounded-3xl shadow-xl mb-16 border-4 border-amber-200">
        <h3 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
          🎯 How StoryLand Works 🎯
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 border-4 border-violet-200">
            <div className="text-6xl mb-6">📚</div>
            <h4 className="text-2xl font-black mb-4 text-violet-700">1. Pick a Story</h4>
            <p className="text-gray-600 text-lg leading-relaxed">
              Choose from lots of fun stories about magic, adventure, and friendship!
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 border-4 border-rose-200">
            <div className="text-6xl mb-6">🤔</div>
            <h4 className="text-2xl font-black mb-4 text-rose-700">2. Make Choices</h4>
            <p className="text-gray-600 text-lg leading-relaxed">
              YOU decide what happens next! Every choice leads to a different adventure!
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 border-4 border-sky-200">
            <div className="text-6xl mb-6">🎉</div>
            <h4 className="text-2xl font-black mb-4 text-sky-700">3. Discover Endings</h4>
            <p className="text-gray-600 text-lg leading-relaxed">
              Each story has many different endings! Try again to find them all!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;