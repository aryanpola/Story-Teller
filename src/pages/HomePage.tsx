import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import StoryCard from '../components/StoryCard';
import Button from '../components/Button';
import ParallaxSection from '../components/ParallaxSection';

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
  image_hd: string;
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

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        
        console.log('Using mock data for demonstration');
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setFeaturedStories([
          {
            _id: '1',
            title: { en: 'The Magic Forest Adventure 🌟' },
            summary: { en: 'Join friendly animals on a magical journey through an enchanted forest full of surprises and wonder!' },
            thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
            image_hd: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop',
            category: 'fantasy',
            ageRange: '5-8',
            stats: { views: 120, averageRating: 4.8 }
          },
          {
            _id: '2',
            title: { en: 'Space Explorers 🚀' },
            summary: { en: 'Blast off to the stars with Captain Luna and discover amazing planets and friendly aliens!' },
            thumbnailUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
            image_hd: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop',
            category: 'adventure',
            ageRange: '7-10',
            stats: { views: 98, averageRating: 4.6 }
          },
          {
            _id: '3',
            title: { en: 'The Secret Garden 🌺' },
            summary: { en: 'Discover a magical garden where flowers sing and butterflies tell wonderful stories!' },
            thumbnailUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
            image_hd: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop',
            category: 'mystery',
            ageRange: '6-9',
            stats: { views: 85, averageRating: 4.5 }
          }
        ]);
        
        setRecentStories([
          {
            _id: '4',
            title: { en: 'The Brave Little Boat ⛵' },
            summary: { en: 'Sail across the big blue ocean with Boaty and meet amazing sea creatures!' },
            thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
            image_hd: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop',
            category: 'adventure',
            ageRange: '3-6',
            stats: { views: 45, averageRating: 4.3 }
          },
          {
            _id: '5',
            title: { en: 'Dinosaur Friends 🦕' },
            summary: { en: 'Meet friendly dinosaurs and learn about their amazing world long, long ago!' },
            thumbnailUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
            image_hd: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
            category: 'educational',
            ageRange: '4-7',
            stats: { views: 72, averageRating: 4.4 }
          },
          {
            _id: '6',
            title: { en: 'The Flying Treehouse 🏠' },
            summary: { en: 'Zoom around the world in a magical treehouse that can fly anywhere you want!' },
            thumbnailUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
            image_hd: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop',
            category: 'fantasy',
            ageRange: '5-8',
            stats: { views: 64, averageRating: 4.2 }
          }
        ]);
        
        setError('');
        
      } catch (err) {
        console.error('Error:', err);
        setError('');
        // Fallback data remains the same
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-hidden">
      {/* Hero Section with Parallax */}
      <ParallaxSection speed={0.1} className="w-full">
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-16 text-center px-2 w-full"
        >
          <div className="bg-gradient-to-r from-sunshine/20 via-ocean/20 to-lavender/20 rounded-3xl p-4 sm:p-8 md:p-12 mb-6 sm:mb-12 shadow-2xl border-4 border-sunshine/50 relative overflow-hidden backdrop-blur-sm w-full">
            {/* Floating decorative elements */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-4 left-4 text-3xl sm:text-4xl"
            >
              ⭐
            </motion.div>
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-8 right-8 text-2xl sm:text-3xl"
            >
              🌈
            </motion.div>
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-4 left-8 text-2xl sm:text-3xl"
            >
              ✨
            </motion.div>
            
            <motion.h1 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black bg-gradient-to-r from-sunshine via-coral to-ocean bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight"
            >
              Welcome to StoryLand! 🌟
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 mb-6 sm:mb-8 font-body font-bold leading-relaxed"
            >
              Where every story is an adventure waiting for YOU! ✨
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/create-story">
                <Button variant="success" size="xl" icon={Sparkles}>
                  Create Your Own Story! 🎨
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-ocean/20 to-lavender/20 border-4 border-ocean/50 text-ocean px-4 sm:px-6 py-3 sm:py-4 rounded-2xl mb-6 sm:mb-8 shadow-lg backdrop-blur-sm w-full"
          >
            <p className="font-heading font-bold text-lg sm:text-xl">🎭 Demo Mode Active!</p>
            <p className="text-base sm:text-lg font-body">We're showing you some amazing sample stories. In the real version, there would be hundreds more!</p>
          </motion.div>
        </motion.section>
      </ParallaxSection>

      {isLoading ? (
        <ParallaxSection speed={0.05}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-10 sm:py-20"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 sm:w-20 h-16 sm:h-20 border-8 border-sunshine/30 border-t-sunshine rounded-full mb-6"
            />
            <motion.p 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl sm:text-3xl font-heading font-bold text-sunshine"
            >
              Loading magical stories... ✨
            </motion.p>
          </motion.div>
        </ParallaxSection>
      ) : error ? (
        <ParallaxSection speed={0.05}>
          <div className="bg-coral/20 border-4 border-coral/50 text-coral px-4 sm:px-6 py-3 sm:py-4 rounded-2xl mb-6 sm:mb-8 text-center backdrop-blur-sm">
            <p className="font-heading font-bold text-xl">{error}</p>
          </div>
        </ParallaxSection>
      ) : (
        <>
          {/* Featured Stories with Parallax - Constrained Width */}
          <ParallaxSection speed={0.08}>
            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-8 sm:mb-16 px-2 w-full"
            >
              <motion.div 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="flex items-center justify-center mb-6 sm:mb-12"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-center bg-gradient-to-r from-sunshine via-coral to-ocean bg-clip-text text-transparent">
                  Featured Adventures
                </h2>
              </motion.div>
              {/* Constrained container for featured stories - use w-full on mobile */}
              <div className="w-full mx-auto space-y-4 sm:space-y-8 px-0 sm:px-4">
                {featuredStories.map((story, index) => (
                  <ParallaxSection key={story._id} speed={0.03 + index * 0.01}>
                    <StoryCard story={story} isFeatured={true} index={index} />
                  </ParallaxSection>
                ))}
              </div>
            </motion.section>
          </ParallaxSection>
          
          {/* Recent Stories with Parallax */}
          <ParallaxSection speed={0.06}>
            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mb-8 sm:mb-16 px-2 w-full"
            >
              <motion.div 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="flex items-center justify-center mb-6 sm:mb-12"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-center bg-gradient-to-r from-mint via-ocean to-lavender bg-clip-text text-transparent">
                  🆕 Brand New Stories 🆕
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 px-0 sm:px-4">
                {recentStories.map((story, index) => (
                  <ParallaxSection key={story._id} speed={0.02 + index * 0.005}>
                    <StoryCard story={story} index={index} />
                  </ParallaxSection>
                ))}
              </div>
            </motion.section>
          </ParallaxSection>
        </>
      )}
      
      {/* How It Works Section with Parallax */}
      <ParallaxSection speed={0.04}>
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-r from-lemon/20 via-coral/20 to-lavender/20 p-4 sm:p-8 md:p-12 rounded-3xl shadow-2xl mb-8 sm:mb-16 border-4 border-lemon/50 backdrop-blur-sm mx-2"
        >
          <motion.h3 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-center mb-6 sm:mb-12 bg-gradient-to-r from-sunshine via-coral to-ocean bg-clip-text text-transparent"
          >
            🎯 How StoryLand Works 🎯
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              { emoji: '📚', title: '1. Pick a Story', desc: 'Choose from lots of fun stories about magic, adventure, and friendship!', color: 'from-lavender to-purple-400' },
              { emoji: '🤔', title: '2. Make Choices', desc: 'YOU decide what happens next! Every choice leads to a different adventure!', color: 'from-coral to-pink-400' },
              { emoji: '🎉', title: '3. Discover Endings', desc: 'Each story has many different endings! Try again to find them all!', color: 'from-ocean to-deep-ocean' }
            ].map((step, index) => (
              <ParallaxSection key={index} speed={0.02 + index * 0.01}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm p-4 sm:p-8 rounded-3xl shadow-xl text-center border-4 border-white/50 hover:border-sunshine/50 transition-all duration-300"
                >
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="text-5xl sm:text-7xl mb-4 sm:mb-6"
                  >
                    {step.emoji}
                  </motion.div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-heading font-black mb-2 sm:mb-4 text-gray-800">{step.title}</h4>
                  <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed font-body font-medium">
                    {step.desc}
                  </p>
                </motion.div>
              </ParallaxSection>
            ))}
          </div>
        </motion.section>
      </ParallaxSection>
    </div>
  );
};

export default HomePage;