import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    parentName: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.parentName) {
      setError('Please fill in all fields! 😊');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords don\'t match! Please try again! 🤗');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password needs to be at least 6 characters long! 🔒');
      return;
    }
    
    try {
      setIsLoading(true);
      const userData = {
        email: formData.email,
        password: formData.password,
        parentName: formData.parentName
      };
      await register(userData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Oops! Something went wrong. Please try again! 🤗');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-emerald-200 to-teal-200 p-6 rounded-full w-24 h-24 mx-auto mb-6 shadow-xl border-4 border-emerald-300">
            <Sparkles className="h-12 w-12 text-emerald-600 mx-auto" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Join StoryLand! ✨
          </h1>
          <p className="text-xl text-gray-600 font-bold">
            Create magical adventures for your little ones!
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-rose-100 border-4 border-rose-200 text-rose-700 px-6 py-4 rounded-2xl mb-6 text-center shadow-lg">
            <p className="font-bold">{error}</p>
          </div>
        )}
        
        {/* Register Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl px-8 pt-8 pb-8 mb-6 border-4 border-emerald-200">
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-black mb-3" htmlFor="email">
              📧 Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-400" />
              <input
                className="w-full pl-12 pr-4 py-4 text-lg border-4 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-black mb-3" htmlFor="parentName">
              👨‍👩‍👧‍👦 Parent Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-400" />
              <input
                className="w-full pl-12 pr-4 py-4 text-lg border-4 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
                id="parentName"
                type="text"
                name="parentName"
                placeholder="Your Name"
                value={formData.parentName}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-black mb-3" htmlFor="password">
              🔒 Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-400" />
              <input
                className="w-full pl-12 pr-4 py-4 text-lg border-4 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-black mb-3" htmlFor="confirmPassword">
              🔒 Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-400" />
              <input
                className="w-full pl-12 pr-4 py-4 text-lg border-4 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <button
            className={`w-full bg-gradient-to-r from-emerald-200 to-teal-200 hover:from-emerald-300 hover:to-teal-300 text-emerald-700 font-black py-4 px-6 rounded-2xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-3 border-4 border-emerald-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-600 border-t-transparent"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus className="h-6 w-6" />
                <span>Start the Adventure! 🚀</span>
              </>
            )}
          </button>
        </form>
        
        {/* Login Link */}
        <div className="text-center bg-gradient-to-r from-violet-100 to-rose-100 p-6 rounded-2xl border-4 border-violet-200">
          <p className="text-lg text-gray-700 font-bold">
            Already have an account? 🎭
          </p>
          <Link 
            to="/login" 
            className="inline-block mt-2 bg-gradient-to-r from-violet-200 to-rose-200 text-violet-700 px-6 py-3 rounded-full font-black text-lg hover:from-violet-300 hover:to-rose-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-violet-300"
          >
            Sign In Here! 🌟
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;