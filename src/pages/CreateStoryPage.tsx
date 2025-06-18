import React from 'react';
import { Sparkles, Wand2, Palette, BookOpen } from 'lucide-react';

const CreateStoryPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-emerald-200 to-teal-200 p-6 rounded-full w-24 h-24 mx-auto mb-6 shadow-xl border-4 border-emerald-300">
          <Sparkles className="h-12 w-12 text-emerald-600 mx-auto" />
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Create Your Story! ✨
        </h1>
        <p className="text-2xl text-gray-600 font-bold">
          Let your imagination run wild!
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-4 border-emerald-200 mb-8">
        <div className="text-8xl mb-8">🎨</div>
        <h2 className="text-4xl font-black text-emerald-700 mb-6">
          Story Creator Coming Soon!
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We're building an amazing story creator where you can make your own interactive adventures! 
          Soon you'll be able to create stories with choices, pictures, and multiple endings!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-violet-100 to-purple-100 p-6 rounded-2xl border-4 border-violet-200">
            <Wand2 className="h-8 w-8 text-violet-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-violet-700 mb-2">Magic Tools</h3>
            <p className="text-gray-600 text-sm">Easy-to-use story builder!</p>
          </div>
          
          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 p-6 rounded-2xl border-4 border-sky-200">
            <Palette className="h-8 w-8 text-sky-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-sky-700 mb-2">Add Pictures</h3>
            <p className="text-gray-600 text-sm">Beautiful images for your story!</p>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-2xl border-4 border-emerald-200">
            <BookOpen className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-emerald-700 mb-2">Story Paths</h3>
            <p className="text-gray-600 text-sm">Create different story branches!</p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-6 rounded-2xl border-4 border-amber-200">
            <Sparkles className="h-8 w-8 text-amber-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-amber-700 mb-2">Share Stories</h3>
            <p className="text-gray-600 text-sm">Let others enjoy your creations!</p>
          </div>
        </div>
      </div>
      
      {/* Features Preview */}
      <div className="bg-gradient-to-r from-rose-100 via-violet-100 to-sky-100 p-8 rounded-3xl border-4 border-rose-200 shadow-xl">
        <h3 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-rose-600 to-violet-600 bg-clip-text text-transparent">
          🌟 What You'll Be Able to Do 🌟
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-rose-200">
            <h4 className="text-xl font-black text-rose-700 mb-3">📝 Write Your Story</h4>
            <p className="text-gray-600">
              Type your amazing story with our easy editor. Add characters, places, and exciting adventures!
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-violet-200">
            <h4 className="text-xl font-black text-violet-700 mb-3">🤔 Add Choices</h4>
            <p className="text-gray-600">
              Give readers choices that change the story! "Should the hero go left or right?"
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-sky-200">
            <h4 className="text-xl font-black text-sky-700 mb-3">🎨 Pick Pictures</h4>
            <p className="text-gray-600">
              Choose beautiful pictures to make your story come alive! Every scene can have its own image.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-emerald-200">
            <h4 className="text-xl font-black text-emerald-700 mb-3">🎉 Multiple Endings</h4>
            <p className="text-gray-600">
              Create different endings based on the choices readers make! Happy, funny, or surprising endings!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryPage;