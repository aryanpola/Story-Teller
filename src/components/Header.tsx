import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, Settings, Sparkles } from 'lucide-react';
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
    <header className="bg-white shadow-lg border-b-4 border-purple-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                StoryLand
              </h1>
              <p className="text-xs text-gray-500">Interactive Adventures</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              <span>{translations.stories[language]}</span>
            </Link>
            
            {user && (
              <Link 
                to="/create-story" 
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                <Sparkles className="h-4 w-4" />
                <span>{translations.createStory[language]}</span>
              </Link>
            )}
          </nav>

          {/* Language Selector */}
          <div className="flex items-center space-x-4">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-lg transition-colors"
                >
                  <User className="h-4 w-4 text-purple-600" />
                  <span className="text-purple-700 font-medium">{user.parentName}</span>
                </Link>
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin"
                    className="flex items-center space-x-2 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Settings className="h-4 w-4 text-orange-600" />
                    <span className="text-orange-700 font-medium">Admin</span>
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4 text-red-600" />
                  <span className="text-red-700 font-medium">{translations.logout[language]}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  {translations.login[language]}
                </Link>
                <Link 
                  to="/register"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
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