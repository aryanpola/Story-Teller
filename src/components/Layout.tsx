import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import ParallaxBackground from './ParallaxBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Add meta viewport configuration for mobile devices
  useEffect(() => {
    // Ensure proper viewport settings for mobile
    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }
    
    // Prevent overflow on mobile
    document.body.style.overflow = 'hidden auto';
    document.documentElement.style.overflow = 'hidden auto';
    
    // Add padding-top for status bar on iOS and Android
    const applyStatusBarHeight = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      
      if (isMobile || isStandalone) {
        document.body.classList.add('safe-area-padding-top');
        // Add class to all containers for better spacing
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
          container.classList.add('mobile-container-padding');
        });
      }
    };
    
    applyStatusBarHeight();
    window.addEventListener('resize', applyStatusBarHeight);
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('safe-area-padding-top');
      window.removeEventListener('resize', applyStatusBarHeight);
      
      const containers = document.querySelectorAll('.container');
      containers.forEach(container => {
        container.classList.remove('mobile-container-padding');
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sunshine/10 via-ocean/10 to-lavender/10 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <ParallaxBackground />
      
      <Header />
      
      {/* Main Content with higher z-index - using max-width for mobile friendliness */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-full overflow-hidden px-3 sm:px-4 py-4 sm:py-8 relative z-10"
      >
        <div className="w-full max-w-[100vw] mx-auto overflow-x-hidden">
          {children}
        </div>
      </motion.main>
      
      {/* Playful Wave Footer */}
      <footer className="relative mt-10 sm:mt-20 z-10">
        <svg 
          className="w-full h-20 text-sunshine" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="currentColor"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill="currentColor"
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="currentColor"
          />
        </svg>
        <div className="bg-sunshine text-white py-8 text-center">
          <p className="font-heading font-bold text-lg">
            Made with 💖 for amazing kids everywhere!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;