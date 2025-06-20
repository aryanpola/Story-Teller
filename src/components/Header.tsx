import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Home, PenTool, User, LogOut, Settings, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, translations } = useLanguage();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  // Detect status bar height for mobile devices
  useEffect(() => {
    const detectStatusBarHeight = () => {
      // For mobile devices, add padding at the top for the status bar
      if (window.innerWidth <= 768) {
        // Increase default status bar height for Android and iOS devices
        setStatusBarHeight(36); // Increased from 24 to 36px for better coverage
      } else {
        setStatusBarHeight(0);
      }
    };

    detectStatusBarHeight();
    window.addEventListener('resize', detectStatusBarHeight);
    
    return () => {
      window.removeEventListener('resize', detectStatusBarHeight);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    try {
      setSidebarOpen(!sidebarOpen);
    } catch (error) {
      console.error('Error toggling sidebar:', error);
      setSidebarOpen(false);
    }
  };

  const closeSidebar = () => {
    try {
      setSidebarOpen(false);
    } catch (error) {
      console.error('Error closing sidebar:', error);
    }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-sunshine via-ocean to-lavender shadow-2xl border-b-8 border-white/50 relative z-20"
        style={{ paddingTop: `${statusBarHeight}px` }}
      >
        <div className="container mx-auto px-4 py-3 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className="bg-white p-2 rounded-full shadow-md border-2 border-sunshine"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-sunshine" />
            </motion.button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-4 group">
              <div className="hidden xs:block">
                <motion.h1 
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white drop-shadow-lg"
                >
                  StoryLand
                </motion.h1>
                <p className="hidden sm:block text-xs md:text-sm lg:text-base text-white/90 font-body font-bold tracking-wide">
                  ✨ Magical Adventures ✨
                </p>
              </div>
            </Link>

            {/* Login Button */}
            {!user ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/login"
                  className="bg-white/90 backdrop-blur-sm text-ocean hover:bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-heading font-bold text-sm sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                >
                  Login
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/profile"
                  className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm hover:bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-ocean" />
                  <span className="text-ocean font-heading font-bold text-sm sm:text-base hidden sm:inline">{user.parentName}</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={closeSidebar}
              style={{ zIndex: 40 }}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gradient-to-br from-ocean via-lavender to-sunshine z-50 shadow-2xl overflow-hidden"
              style={{ paddingTop: `${Math.max(statusBarHeight, 36)}px` }}
            >
              <div className="p-4 overflow-y-auto overflow-x-hidden h-full w-full">
                {/* Hamburger Menu Button at top of sidebar */}
                <div className="flex justify-start mb-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeSidebar}
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full shadow-md border border-white/30 hover:bg-white/30 transition-all duration-300"
                    aria-label="Close menu"
                  >
                    <Menu className="h-6 w-6 text-white" />
                  </motion.button>
                </div>

                {/* User info if logged in */}
                {user && (
                  <div className="mb-4 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="bg-white p-2 rounded-full shadow-lg">
                        <User className="h-4 w-4 text-ocean" />
                      </div>
                      <div className="truncate">
                        <h3 className="text-white font-heading font-bold text-base truncate">
                          {user.parentName}
                        </h3>
                        <p className="text-white/80 text-xs font-body truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <nav className="flex flex-col space-y-2 mt-2">
                  {/* Main Navigation - Top 4 buttons */}
                  <Link 
                    to="/" 
                    onClick={closeSidebar}
                    className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-lg transition-all duration-300 font-heading font-semibold text-base w-full"
                  >
                    <Home className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{translations.home[language] || 'Home'}</span>
                  </Link>

                  <Link 
                    to="/stories" 
                    onClick={closeSidebar}
                    className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-lg transition-all duration-300 font-heading font-semibold text-base w-full"
                  >
                    <Heart className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{translations.stories[language]}</span>
                  </Link>
                  
                  {user && (
                    <Link 
                      to="/create-story" 
                      onClick={closeSidebar}
                      className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-lg transition-all duration-300 font-heading font-semibold text-base w-full"
                    >
                      <Sparkles className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate">{translations.createStory[language]}</span>
                    </Link>
                  )}
                  
                  {/* Separator line between main nav and user-specific links */}
                  {user && (
                    <div className="border-t border-white/20 my-4"></div>
                  )}
                  
                  {/* User-specific links (Profile, Admin) */}
                  {user && (
                    <>
                      <Link 
                        to="/profile" 
                        onClick={closeSidebar}
                        className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-lg transition-all duration-300 font-heading font-semibold text-base w-full"
                      >
                        <User className="h-5 w-5 flex-shrink-0" />
                        <span className="truncate">{translations.profile[language] || 'Profile'}</span>
                      </Link>
                      
                      {user.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          onClick={closeSidebar}
                          className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-lg transition-all duration-300 font-heading font-semibold text-base w-full"
                        >
                          <Settings className="h-5 w-5 flex-shrink-0" />
                          <span className="truncate">Admin Panel</span>
                        </Link>
                      )}
                    </>
                  )}
                </nav>

                <div className="mt-6 p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                  <p className="text-white text-sm font-body mb-3 font-medium">
                    {translations.language[language] || 'Language'}:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { code: 'en', flag: '🇺🇸', name: 'English' },
                      { code: 'fr', flag: '🇫🇷', name: 'Français' },
                      { code: 'es', flag: '🇪🇸', name: 'Español' },
                      { code: 'hi', flag: '🇮🇳', name: 'हिंदी' }
                    ].map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as any)}
                        className={`flex flex-col items-center py-2 px-1 rounded-md transition-all duration-200 ${
                          language === lang.code ? 'bg-white/40' : 'hover:bg-white/30'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-xs text-white mt-1 truncate font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Login/Logout button at bottom */}
                <div className="mt-6 mb-4 border-t border-white/20 pt-4">
                  {user ? (
                    <button 
                      onClick={() => {
                        handleLogout();
                        closeSidebar();
                      }}
                      className="flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm text-red-300 hover:text-red-200 p-3 rounded-lg transition-all duration-300 font-heading font-semibold text-base w-full border border-red-400/30"
                    >
                      <LogOut className="h-5 w-5 flex-shrink-0" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link 
                      to="/login" 
                      onClick={closeSidebar}
                      className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-lg transition-all duration-300 font-heading font-semibold text-base w-full border border-white/30"
                    >
                      <LogOut className="h-5 w-5 transform rotate-180 flex-shrink-0" />
                      <span>Login</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;