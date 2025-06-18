import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StoryReaderPage from './pages/StoryReaderPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import CreateStoryPage from './pages/CreateStoryPage';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 via-lavender-50 to-mint-50" style={{
            background: 'linear-gradient(135deg, #fdf2f8 0%, #f0f9ff 25%, #f3e8ff 50%, #f0fdfa 75%, #fffbeb 100%)'
          }}>
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/story/:id" element={<StoryReaderPage />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/create-story" element={
                  <ProtectedRoute>
                    <CreateStoryPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <AdminPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;