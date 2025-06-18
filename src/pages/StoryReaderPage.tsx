import React from 'react';
import { BookOpen, Heart, Star } from 'lucide-react';

const StoryReaderPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-violet-200 to-rose-200 p-6 rounded-full w-24 h-24 mx-auto mb-6 shadow-xl border-4 border-violet-300">
          <BookOpen className="h-12 w-12 text-violet-600 mx-auto" />
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent mb-4">
          Story Reader 📖
        </h1>
        <p className="text-2xl text-gray-600 font-bold">
          Get ready for an amazing adventure!
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-4 border-violet-200">
        <div className="text-8xl mb-8">🚧</div>
        <h2 className="text-4xl font-black text-violet-700 mb-6">
          Coming Soon!
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We're working hard to bring you the most amazing interactive story reader! 
          Soon you'll be able to read stories, make choices, and go on incredible adventures!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-violet-100 to-purple-100 p-6 rounded-2xl border-4 border-violet-200">
            <Heart className="h-8 w-8 text-violet-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-violet-700 mb-2">Interactive Choices</h3>
            <p className="text-gray-600">Make decisions that change the story!</p>
          </div>
          
          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 p-6 rounded-2xl border-4 border-sky-200">
            <Star className="h-8 w-8 text-sky-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-sky-700 mb-2">Beautiful Pictures</h3>
            <p className="text-gray-600">Amazing illustrations for every scene!</p>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-2xl border-4 border-emerald-200">
            <BookOpen className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-emerald-700 mb-2">Multiple Endings</h3>
            <p className="text-gray-600">Discover different story endings!</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-6 rounded-2xl border-4 border-amber-200">
          <p className="text-lg font-bold text-amber-700">
            🎭 This page will show interactive stories where kids can click on choices 
            and see the story change based on their decisions!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryReaderPage;