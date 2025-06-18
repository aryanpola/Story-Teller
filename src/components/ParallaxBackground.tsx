import React from 'react';
import { motion } from 'framer-motion';
import { useParallaxElement } from '../hooks/useParallax';

const ParallaxBackground: React.FC = () => {
  const cloud1Style = useParallaxElement(-0.2);
  const cloud2Style = useParallaxElement(-0.3);
  const cloud3Style = useParallaxElement(-0.15);
  const star1Style = useParallaxElement(-0.4);
  const star2Style = useParallaxElement(-0.25);
  const star3Style = useParallaxElement(-0.35);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sunshine/5 via-ocean/5 to-lavender/5 animate-pulse-slow" />
      
      {/* Floating Clouds */}
      <motion.div
        style={cloud1Style}
        className="absolute top-20 left-10 text-6xl opacity-30"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        ☁️
      </motion.div>
      
      <motion.div
        style={cloud2Style}
        className="absolute top-40 right-20 text-8xl opacity-20"
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        ☁️
      </motion.div>
      
      <motion.div
        style={cloud3Style}
        className="absolute top-80 left-1/3 text-5xl opacity-25"
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        ☁️
      </motion.div>
      
      {/* Floating Stars */}
      <motion.div
        style={star1Style}
        className="absolute top-32 right-1/4 text-4xl opacity-40"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        ⭐
      </motion.div>
      
      <motion.div
        style={star2Style}
        className="absolute top-60 left-1/4 text-3xl opacity-35"
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        ✨
      </motion.div>
      
      <motion.div
        style={star3Style}
        className="absolute top-96 right-1/3 text-5xl opacity-30"
        animate={{ 
          rotate: [0, 360],
          y: [0, -10, 0]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        🌟
      </motion.div>
      
      {/* Floating Magical Elements */}
      <motion.div
        style={useParallaxElement(-0.1)}
        className="absolute top-[500px] left-20 text-4xl opacity-25"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        🦋
      </motion.div>
      
      <motion.div
        style={useParallaxElement(-0.45)}
        className="absolute top-[700px] right-16 text-3xl opacity-30"
        animate={{ 
          x: [0, 25, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        🌈
      </motion.div>
      
      <motion.div
        style={useParallaxElement(-0.2)}
        className="absolute top-[900px] left-1/2 text-4xl opacity-20"
        animate={{ 
          rotate: [0, 360],
          y: [0, -15, 0]
        }}
        transition={{ 
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        🎈
      </motion.div>
      
      {/* More Scattered Elements */}
      <motion.div
        style={useParallaxElement(-0.3)}
        className="absolute top-[1200px] right-1/4 text-3xl opacity-25"
        animate={{ 
          x: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      >
        🎭
      </motion.div>
      
      <motion.div
        style={useParallaxElement(-0.15)}
        className="absolute top-[1400px] left-1/3 text-5xl opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          y: [0, -25, 0]
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        🎪
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;