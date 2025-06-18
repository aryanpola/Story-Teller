import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StoryReaderPage from './pages/StoryReaderPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import CreateStoryPage from './pages/CreateStoryPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useBackgroundImageOnHover } from './hooks/useBackgroundImageOnHover';

// Import Google Fonts
import './styles/fonts.css';

function AppContent() {
  useBackgroundImageOnHover();
  
  return (
    <Layout>
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
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;