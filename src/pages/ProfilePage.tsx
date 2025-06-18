import React from 'react';
import { User, Settings, Star, BookOpen, Trophy, Heart } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-sky-200 to-violet-200 p-6 rounded-full w-24 h-24 mx-auto mb-6 shadow-xl border-4 border-sky-300">
          <User className="h-12 w-12 text-sky-600 mx-auto" />
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent mb-4">
          Your Profile 👤
        </h1>
        <p className="text-2xl text-gray-600 font-bold">
          See all your amazing adventures!
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-4 border-sky-200 mb-8">
        <div className="text-8xl mb-8">👨‍👩‍👧‍👦</div>
        <h2 className="text-4xl font-black text-sky-700 mb-6">
          Profile Page Coming Soon!
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We're creating an awesome profile page where you can see all your stories, 
          achievements, and favorite adventures!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-2xl border-4 border-emerald-200">
            <BookOpen className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-emerald-700 mb-2">Your Stories</h3>
            <p className="text-gray-600">See all the stories you've read!</p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-6 rounded-2xl border-4 border-amber-200">
            <Trophy className="h-8 w-8 text-amber-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-amber-700 mb-2">Achievements</h3>
            <p className="text-gray-600">Collect badges for reading!</p>
          </div>
          
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-6 rounded-2xl border-4 border-rose-200">
            <Heart className="h-8 w-8 text-rose-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-rose-700 mb-2">Favorites</h3>
            <p className="text-gray-600">Keep track of your favorite stories!</p>
          </div>
        </div>
      </div>
      
      {/* Features Preview */}
      <div className="bg-gradient-to-r from-violet-100 via-rose-100 to-sky-100 p-8 rounded-3xl border-4 border-violet-200 shadow-xl">
        <h3 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
          🎯 What You'll See Here 🎯
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-violet-200">
            <h4 className="text-xl font-black text-violet-700 mb-3">📊 Reading Stats</h4>
            <p className="text-gray-600">
              See how many stories you've read, your favorite categories, and reading streaks!
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-sky-200">
            <h4 className="text-xl font-black text-sky-700 mb-3">⚙️ Settings</h4>
            <p className="text-gray-600">
              Change your language, reading preferences, and account settings!
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-emerald-200">
            <h4 className="text-xl font-black text-emerald-700 mb-3">🏆 Badge Collection</h4>
            <p className="text-gray-600">
              Earn special badges for reading different types of stories and completing challenges!
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-rose-200">
            <h4 className="text-xl font-black text-rose-700 mb-3">📚 Story History</h4>
            <p className="text-gray-600">
              Keep track of all the amazing adventures you've been on and revisit your favorites!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;