import React from 'react';
import { Settings, Users, BookOpen, BarChart3, Shield } from 'lucide-react';

const AdminPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-orange-200 to-amber-200 p-6 rounded-full w-24 h-24 mx-auto mb-6 shadow-xl border-4 border-orange-300">
          <Shield className="h-12 w-12 text-orange-600 mx-auto" />
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
          Admin Dashboard 🛡️
        </h1>
        <p className="text-2xl text-gray-600 font-bold">
          Manage the magical world of StoryLand!
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-4 border-orange-200 mb-8">
        <div className="text-8xl mb-8">⚡</div>
        <h2 className="text-4xl font-black text-orange-700 mb-6">
          Admin Tools Coming Soon!
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We're building powerful admin tools to help you manage users, stories, 
          and keep StoryLand safe and fun for everyone!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 p-6 rounded-2xl border-4 border-sky-200">
            <Users className="h-8 w-8 text-sky-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-sky-700 mb-2">User Management</h3>
            <p className="text-gray-600 text-sm">Manage user accounts!</p>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-2xl border-4 border-emerald-200">
            <BookOpen className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-emerald-700 mb-2">Story Control</h3>
            <p className="text-gray-600 text-sm">Review and approve stories!</p>
          </div>
          
          <div className="bg-gradient-to-r from-violet-100 to-purple-100 p-6 rounded-2xl border-4 border-violet-200">
            <BarChart3 className="h-8 w-8 text-violet-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-violet-700 mb-2">Analytics</h3>
            <p className="text-gray-600 text-sm">View platform statistics!</p>
          </div>
          
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-6 rounded-2xl border-4 border-orange-200">
            <Settings className="h-8 w-8 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-black text-orange-700 mb-2">Settings</h3>
            <p className="text-gray-600 text-sm">Configure platform settings!</p>
          </div>
        </div>
      </div>
      
      {/* Features Preview */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 p-8 rounded-3xl border-4 border-amber-200 shadow-xl">
        <h3 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          🔧 Admin Features 🔧
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-amber-200">
            <h4 className="text-xl font-black text-amber-700 mb-3">👥 User Dashboard</h4>
            <p className="text-gray-600">
              View all users, manage accounts, and ensure everyone has a safe experience!
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-orange-200">
            <h4 className="text-xl font-black text-orange-700 mb-3">📖 Content Moderation</h4>
            <p className="text-gray-600">
              Review user-created stories to make sure they're appropriate for children!
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-rose-200">
            <h4 className="text-xl font-black text-rose-700 mb-3">📊 Platform Analytics</h4>
            <p className="text-gray-600">
              See how many stories are being read, which are most popular, and user engagement!
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-emerald-200">
            <h4 className="text-xl font-black text-emerald-700 mb-3">🛡️ Safety Tools</h4>
            <p className="text-gray-600">
              Advanced tools to keep StoryLand a safe and magical place for all children!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;