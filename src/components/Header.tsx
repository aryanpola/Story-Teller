import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, Settings, Sparkles, Heart, Menu, X, Home, PenTool } from 'lucide-react';
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
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
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
              className="block md:hidden bg-white p-2 rounded-full shadow-md border-2 border-sunshine"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-sunshine" />
            </motion.button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-4 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white p-2 sm:p-4 rounded-full shadow-xl border-4 border-sunshine"
              >
                <BookOpen className="h-6 w-6 sm:h-10 sm:w-10 text-sunshine" />
              </motion.div>
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-sunshine hover:bg-white px-6 py-3 rounded-full transition-all duration-300 font-heading font-bold text-lg shadow-lg hover:shadow-xl border-2 border-white"
                >
                  <Heart className="h-5 w-5" />
                  <span>{translations.stories[language]}</span>
                </Link>
              </motion.div>
              
              {user && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/create-story" 
                    className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-mint hover:bg-white px-6 py-3 rounded-full transition-all duration-300 font-heading font-bold text-lg shadow-lg hover:shadow-xl border-2 border-white"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span>{translations.createStory[language]}</span>
                  </Link>
                </motion.div>
              )}
            </nav>

            {/* User Menu & Auth Buttons (no language selector) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop User Menu */}
              <div className="hidden md:flex items-center space-x-3">
                {user ? (
                  <>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        to="/profile"
                        className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm hover:bg-white px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                      >
                        <User className="h-5 w-5 text-ocean" />
                        <span className="text-ocean font-heading font-bold">{user.parentName}</span>
                      </Link>
                    </motion.div>
                    
                    {user.role === 'admin' && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link 
                          to="/admin"
                          className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm hover:bg-white text-coral px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                        >
                          <Settings className="h-5 w-5" />
                          <span className="font-heading font-bold">Admin</span>
                        </Link>
                      </motion.div>
                    )}
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm hover:bg-white text-coral px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-heading font-bold">{translations.logout[language]}</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        to="/login"
                        className="bg-white/90 backdrop-blur-sm text-ocean hover:bg-white px-6 py-3 rounded-full font-heading font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                      >
                        {translations.login[language]}
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        to="/register"
                        className="bg-white text-sunshine px-6 py-3 rounded-full font-heading font-bold text-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                      >
                        {translations.register[language]}
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Mobile Profile Button */}
              {user && (
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="md:hidden"
                >
                  <Link 
                    to="/profile"
                    className="flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                  >
                    <User className="h-6 w-6 text-ocean" />
                  </Link>
                </motion.div>
              )}
              
              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="md:hidden flex space-x-2">
                  <Link 
                    to="/login"
                    className="bg-white/90 backdrop-blur-sm text-ocean hover:bg-white px-4 py-2 rounded-full font-heading font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                  >
                    {translations.login[language]}
                  </Link>
                  <Link 
                    to="/register"
                    className="bg-white text-sunshine hover:bg-white/90 px-4 py-2 rounded-full font-heading font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                  >
                    {translations.register[language]}
                  </Link>
                </div>
              )}
            </div>
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
              className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
              onClick={closeSidebar}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gradient-to-br from-ocean via-lavender to-sunshine z-40 shadow-2xl overflow-y-auto pb-20 sidebar"
              style={{ paddingTop: `${Math.max(statusBarHeight, 36)}px` }}
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-3 rounded-full shadow-lg border-4 border-white">
                      <BookOpen className="h-7 w-7 text-sunshine" />
                    </div>
                    <h2 className="text-2xl font-heading font-black text-white">StoryLand</h2>
                  </div>
                  <button 
                    onClick={closeSidebar} 
                    className="bg-white/90 p-2 rounded-full shadow-lg border-2 border-white"
                  >
                    <X className="h-6 w-6 text-coral" />
                  </button>
                </div>

                {user && (
                  <div className="mb-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-white p-3 rounded-full shadow-lg">
                        <User className="h-6 w-6 text-ocean" />
                      </div>
                      <div>
                        <h3 className="text-white font-heading font-bold text-xl">
                          {user.parentName}
                        </h3>
                        <p className="text-white/80 text-sm font-body">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <nav className="flex flex-col space-y-2">
                  <Link 
                    to="/" 
                    onClick={closeSidebar}
                    className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 font-heading font-bold text-lg"
                  >
                    <Home className="h-6 w-6" />
                    <span>{translations.home[language] || 'Home'}</span>
                  </Link>

                  <Link 
                    to="/stories" 
                    onClick={closeSidebar}
                    className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 font-heading font-bold text-lg"
                  >
                    <Heart className="h-6 w-6" />
                    <span>{translations.stories[language]}</span>
                  </Link>
                  
                  {user && (
                    <>
                      <Link 
                        to="/create-story" 
                        onClick={closeSidebar}
                        className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 font-heading font-bold text-lg"
                      >
                        <Sparkles className="h-6 w-6" />
                        <span>{translations.createStory[language]}</span>
                      </Link>
                      
                      <Link 
                        to="/profile" 
                        onClick={closeSidebar}
                        className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 font-heading font-bold text-lg"
                      >
                        <User className="h-6 w-6" />
                        <span>{translations.profile[language] || 'Profile'}</span>
                      </Link>
                      
                      {user.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          onClick={closeSidebar}
                          className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 font-heading font-bold text-lg"
                        >
                          <Settings className="h-6 w-6" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      
                      <button 
                        onClick={() => {
                          handleLogout();
                          closeSidebar();
                        }}
                        className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 font-heading font-bold text-lg"
                      >
                        <LogOut className="h-6 w-6" />
                        <span>{translations.logout[language]}</span>
                      </button>
                    </>
                  )}
                  
                  {!user && (
                    <>
                      <Link 
                        to="/login" 
                        onClick={closeSidebar}
                        className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 font-heading font-bold text-lg"
                      >
                        <LogOut className="h-6 w-6 transform rotate-180" />
                        <span>{translations.login[language]}</span>
                      </Link>
                      
                      <Link 
                        to="/register" 
                        onClick={closeSidebar}
                        className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 font-heading font-bold text-lg"
                      >
                        <PenTool className="h-6 w-6" />
                        <span>{translations.register[language]}</span>
                      </Link>
                    </>
                  )}
                </nav>

                <div className="mt-8 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                  <p className="text-white text-sm font-body mb-2 font-medium">
                    {translations.language[language] || 'Language'}:
                  </p>
                  <div className="flex justify-around">
                    {[
                      { code: 'en', flag: '🇺🇸', name: 'English' },
                      { code: 'fr', flag: '🇫🇷', name: 'Français' },
                      { code: 'es', flag: '🇪🇸', name: 'Español' },
                      { code: 'hi', flag: '🇮🇳', name: 'हिंदी' }
                    ].map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as any)}
                        className={`flex flex-col items-center p-2 rounded-lg ${
                          language === lang.code ? 'bg-white/40' : 'hover:bg-white/30'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-xs text-white mt-1">{lang.name}</span>
                      </button>
                    ))}
                  </div>
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