import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, Settings, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Button from './Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, translations } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-sunshine via-ocean to-lavender shadow-2xl border-b-8 border-white/50"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white p-4 rounded-full shadow-xl border-4 border-sunshine"
            >
              <BookOpen className="h-10 w-10 text-sunshine" />
            </motion.div>
            <div>
              <motion.h1 
                whileHover={{ scale: 1.05 }}
                className="text-4xl md:text-5xl font-heading font-black text-white drop-shadow-lg"
              >
                StoryLand
              </motion.h1>
              <p className="text-sm md:text-base text-white/90 font-body font-bold tracking-wide">
                ✨ Magical Adventures ✨
              </p>
            </div>
          </Link>

          {/* Navigation */}
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

          {/* Language Selector & User Menu */}
          <div className="flex items-center space-x-4">
            <motion.select 
              whileHover={{ scale: 1.05 }}
              value={language} 
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-white/90 backdrop-blur-sm border-4 border-white rounded-full px-4 py-2 text-lg font-heading font-bold text-sunshine focus:outline-none focus:ring-4 focus:ring-white/50 shadow-lg"
            >
              <option value="en">🇺🇸 EN</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="es">🇪🇸 ES</option>
              <option value="hi">🇮🇳 HI</option>
            </motion.select>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/profile"
                    className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm hover:bg-white px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                  >
                    <User className="h-5 w-5 text-ocean" />
                    <span className="text-ocean font-heading font-bold hidden md:inline">{user.parentName}</span>
                  </Link>
                </motion.div>
                
                {user.role === 'admin' && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/admin"
                      className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm hover:bg-white text-coral px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
                    >
                      <Settings className="h-5 w-5" />
                      <span className="font-heading font-bold hidden md:inline">Admin</span>
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
                  <span className="font-heading font-bold hidden md:inline">{translations.logout[language]}</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;