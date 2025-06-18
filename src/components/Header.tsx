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
    <header className="bg-gradient-to-r from-rose-200 via-sky-200 to-violet-200 shadow-xl border-b-8 border-amber-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="bg-gradient-to-br from-amber-200 to-orange-200 p-4 rounded-full shadow-lg group-hover:scale-110 transition-all duration-300 animate-pulse">
              <BookOpen className="h-10 w-10 text-amber-700" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent drop-shadow-lg">
                StoryLand
              </h1>
              <p className="text-sm text-violet-600 font-bold tracking-wide">
                ✨ Magical Adventures ✨
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm text-violet-700 hover:bg-white/80 px-6 py-3 rounded-full transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-violet-200"
            >
              <Heart className="h-5 w-5" />
              <span>{translations.stories[language]}</span>
            </Link>
            
            {user && (
              <Link 
                to="/create-story" 
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-200 to-teal-200 text-emerald-700 hover:from-emerald-300 hover:to-teal-300 px-6 py-3 rounded-full transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-emerald-300"
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
              className="bg-white/80 backdrop-blur-sm border-4 border-amber-200 rounded-full px-4 py-2 text-lg font-bold text-violet-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-lg"
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
                  className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm hover:bg-white px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-violet-200"
                >
                  <User className="h-5 w-5 text-violet-600" />
                  <span className="text-violet-700 font-bold">{user.parentName}</span>
                </Link>
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin"
                    className="flex items-center space-x-2 bg-gradient-to-r from-orange-200 to-amber-200 hover:from-orange-300 hover:to-amber-300 text-orange-700 px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-orange-300"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="font-bold">Admin</span>
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gradient-to-r from-rose-200 to-pink-200 hover:from-rose-300 hover:to-pink-300 text-rose-700 px-4 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-rose-300"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-bold">{translations.logout[language]}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login"
                  className="bg-white/80 backdrop-blur-sm text-violet-700 hover:bg-white px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-violet-200"
                >
                  {translations.login[language]}
                </Link>
                <Link 
                  to="/register"
                  className="bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-700 px-6 py-3 rounded-full font-bold text-lg hover:from-amber-300 hover:to-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-amber-300"
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