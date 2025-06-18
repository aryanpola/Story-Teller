import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields! 😊');
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Oops! Something went wrong. Please try again! 🤗');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-6 rounded-full w-24 h-24 mx-auto mb-6 shadow-xl">
            <Heart className="h-12 w-12 text-white mx-auto" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Welcome Back! 🎉
          </h1>
          <p className="text-xl text-gray-600 font-bold">
            Ready for more amazing adventures?
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-4 border-red-300 text-red-700 px-6 py-4 rounded-2xl mb-6 text-center shadow-lg">
            <p className="font-bold">{error}</p>
          </div>
        )}
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl px-8 pt-8 pb-8 mb-6 border-4 border-purple-200">
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-black mb-3" htmlFor="email">
              📧 Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              <input
                className="w-full pl-12 pr-4 py-4 text-lg border-4 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-black mb-3" htmlFor="password">
              🔒 Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              <input
                className="w-full pl-12 pr-4 py-4 text-lg border-4 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <button
            className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black py-4 px-6 rounded-2xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-3 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <LogIn className="h-6 w-6" />
                <span>Let's Go! 🚀</span>
              </>
            )}
          </button>
        </form>
        
        {/* Register Link */}
        <div className="text-center bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl border-4 border-blue-200">
          <p className="text-lg text-gray-700 font-bold">
            New to StoryLand? 🌟
          </p>
          <Link 
            to="/register" 
            className="inline-block mt-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full font-black text-lg hover:from-green-500 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Join the Adventure! ✨
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;