import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, Settings, Sparkles, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, translations } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 shadow-xl border-b-8 border-yellow-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="bg-gradient-to-br from-yellow-300 to-orange-400 p-4 rounded-full shadow-lg group-hover:scale-110 transition-all duration-300 animate-pulse">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent drop-shadow-lg">
                StoryLand
              </h1>
              <p className="text-sm text-white/90 font-bold tracking-wide">
                ✨ Magical Adventures ✨
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Heart className="h-5 w-5" />
              <span>{translations.stories[language]}</span>
            </Link>
            
            {user && (
              <Link 
                to="/create-story" 
                className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 px-6 py-3 rounded-full transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Sparkles className="h-5 w-5" />
                <span>{translations.createStory[language]}</span>
              </Link>
            )}
          </nav>

          {/* Language Selector & User Menu */}
          <div className="flex items-center space-x-4">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-white/90 backdrop-blur-sm border-4 border-yellow-300 rounded-full px-4 py-2 text-lg font-bold text-purple-700 focus:outline-none focus:ring-4 focus:ring-yellow-400 shadow-lg"
            >
              <option value="en">🇺🇸 EN</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="es">🇪🇸 ES</option>
              <option value="hi">🇮🇳 HI</option>
            </select>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/profile"
                  className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm hover:bg-white px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <User className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-700 font-bold">{user.parentName}</span>
                </Link>
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin"
                    className="flex items-center space-x-2 bg-orange-400 hover:bg-orange-500 text-white px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="font-bold">Admin</span>
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-400 hover:bg-red-500 text-white px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-bold">{translations.logout[language]}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login"
                  className="bg-white/90 backdrop-blur-sm text-purple-700 hover:bg-white px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {translations.login[language]}
                </Link>
                <Link 
                  to="/register"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {translations.register[language]}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;