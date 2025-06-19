import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, Play, Heart, Rocket, TreePine, Users, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParallaxElement } from '../hooks/useParallax';

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
  image_hd?: string;
  category: string;
  ageRange: string;
  stats: {
    views: number;
    averageRating: number;
  };
}

interface StoryCardProps {
  story: Story;
  isFeatured?: boolean;
  index?: number;
}

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
  fantasy: 'from-lavender to-purple-300',
  adventure: 'from-ocean to-deep-ocean',
  educational: 'from-mint to-emerald-400',
  friendship: 'from-coral to-pink-400',
  nature: 'from-green-300 to-mint',
  family: 'from-sunshine to-lemon',
  mystery: 'from-indigo-300 to-lavender'
};

const StoryCard: React.FC<StoryCardProps> = ({ story, isFeatured = false, index = 0 }) => {
  const CategoryIcon = categoryIcons[story.category as keyof typeof categoryIcons] || BookOpen;
  const categoryColor = categoryColors[story.category as keyof typeof categoryColors] || 'from-lavender to-purple-300';
  
  // High-resolution image URL (fallback to thumbnail if not provided)
  const imageHd = story.image_hd || story.thumbnailUrl;
  
  // Subtle parallax effect for the card
  const cardParallax = useParallaxElement(0.02);
  
  return (
    <motion.div
      style={cardParallax}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group w-full"
    >
      <Link 
        to={`/story/${story._id}`}
        data-image-hd={imageHd}
        className={`block ${isFeatured ? 'md:flex' : ''} bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-sunshine/30 hover:border-sunshine ${isFeatured ? 'mb-4 sm:mb-8' : 'mb-3 sm:mb-6'} w-full`}
      >
        <div className={`relative ${isFeatured ? 'md:w-1/2' : 'w-full'} ${isFeatured ? 'h-60 sm:h-80' : 'h-44 sm:h-56'} overflow-hidden`}>
          <motion.img 
            src={story.thumbnailUrl} 
            alt={story.title.en} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          
          {/* Category Badge with Parallax */}
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={useParallaxElement(-0.01)}
            className={`absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-r ${categoryColor} text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg flex items-center space-x-1 sm:space-x-2 border-2 sm:border-3 border-white font-heading font-bold`}
          >
            <CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm capitalize">{story.category}</span>
          </motion.div>
          
          {/* Age Badge with Parallax */}
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -5 }}
            style={useParallaxElement(-0.015)}
            className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-gradient-to-r from-sunshine to-lemon text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg border-2 sm:border-3 border-white font-heading font-bold"
          >
            <span className="text-xs sm:text-sm">Ages {story.ageRange}</span>
          </motion.div>
          
          {/* Play Button Overlay with Enhanced Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div 
              whileHover={{ 
                scale: 1.2, 
                rotate: 360,
                boxShadow: "0 0 30px rgba(255, 183, 3, 0.6)"
              }}
              transition={{ duration: 0.5 }}
              className="bg-white/95 backdrop-blur-sm rounded-full p-4 sm:p-6 shadow-2xl border-3 sm:border-4 border-sunshine"
            >
              <Play className="h-6 w-6 sm:h-10 sm:w-10 text-sunshine fill-current" />
            </motion.div>
          </motion.div>
        </div>
        
        <div className={`p-3 sm:p-6 ${isFeatured ? 'md:w-1/2' : ''} ${isFeatured ? 'md:p-6 lg:p-8' : ''}`}>
          <motion.h3 
            whileHover={{ scale: 1.05 }}
            className={`${isFeatured ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-2xl'} font-heading font-black mb-2 sm:mb-4 text-gray-800 group-hover:text-sunshine transition-colors leading-tight`}
          >
            {story.title.en}
          </motion.h3>
          <p className={`text-gray-600 mb-4 sm:mb-6 ${isFeatured ? 'text-sm sm:text-base md:text-lg' : 'text-xs sm:text-base'} leading-relaxed font-body font-medium`}>
            {story.summary.en}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="flex items-center space-x-1 bg-gradient-to-r from-lemon to-sunshine text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full border-2 border-white shadow-lg"
              >
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                <span className="font-heading font-bold text-xs sm:text-sm">{story.stats.averageRating.toFixed(1)}</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -10 }}
                className="flex items-center space-x-1 bg-gradient-to-r from-ocean to-deep-ocean text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full border-2 border-white shadow-lg"
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-heading font-bold text-xs sm:text-sm">{story.stats.views}</span>
              </motion.div>
            </div>
            
            <motion.div 
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                boxShadow: "0 10px 25px rgba(255, 107, 107, 0.3)"
              }}
              className="bg-gradient-to-r from-coral to-pink-400 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full font-heading font-bold text-xs sm:text-sm group-hover:from-coral/80 group-hover:to-pink-400/80 transition-all border-2 border-white shadow-lg"
            >
              Read Story! 📖
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoryCard;