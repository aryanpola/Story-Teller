import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/supabaseAuthService';

const EmailLoginTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('password123');
  
  const { user, login, register, logout } = useAuth();

  const addResult = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setTestResults(prev => [...prev, `${emoji} ${message}`]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const testEmailRegistration = async () => {
    addResult('Testing email registration...', 'info');
    
    try {
      await register({
        email: testEmail,
        password: testPassword,
        fullName: 'Test User',
        username: 'testuser'
      });
      
      addResult('Registration successful!', 'success');
      addResult(`User created with email: ${testEmail}`, 'info');
      
    } catch (error: any) {
      if (error.message.includes('already registered')) {
        addResult('User already exists - this is fine for testing', 'info');
      } else {
        addResult(`Registration failed: ${error.message}`, 'error');
      }
    }
  };

  const testEmailLogin = async () => {
    addResult('Testing email login...', 'info');
    
    try {
      await login(testEmail, testPassword);
      addResult('Login successful!', 'success');
      addResult(`Logged in as: ${testEmail}`, 'info');
      
    } catch (error: any) {
      addResult(`Login failed: ${error.message}`, 'error');
      
      if (error.message.includes('Invalid login credentials')) {
        addResult('This could mean: email not confirmed or wrong password', 'info');
      }
      if (error.message.includes('Email not confirmed')) {
        addResult('Check your email for confirmation link', 'info');
      }
    }
  };

  const testDirectSupabaseLogin = async () => {
    addResult('Testing direct Supabase login (bypassing AuthContext)...', 'info');
    
    try {
      const result = await authService.signIn({
        email: testEmail,
        password: testPassword
      });
      
      addResult('Direct Supabase login successful!', 'success');
      addResult(`User ID: ${result.user.id}`, 'info');
      addResult(`Email: ${result.user.email}`, 'info');
      addResult(`Session exists: ${!!result.session}`, 'info');
      
    } catch (error: any) {
      addResult(`Direct login failed: ${error.message}`, 'error');
    }
  };

  const testLogout = async () => {
    addResult('Testing logout...', 'info');
    
    try {
      await logout();
      addResult('Logout successful!', 'success');
      
    } catch (error: any) {
      addResult(`Logout failed: ${error.message}`, 'error');
    }
  };

  const runFullTest = async () => {
    setIsLoading(true);
    clearResults();
    
    addResult('🚀 Starting comprehensive email login test...', 'info');
    addResult(`Testing with email: ${testEmail}`, 'info');
    addResult('---', 'info');
    
    // Test 1: Registration
    await testEmailRegistration();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 2: Login via AuthContext
    addResult('---', 'info');
    await testEmailLogin();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 3: Direct Supabase login
    addResult('---', 'info');
    await testDirectSupabaseLogin();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 4: Logout
    addResult('---', 'info');
    await testLogout();
    
    addResult('---', 'info');
    addResult('🎉 Email login test completed!', 'success');
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-blue-200">
        <h2 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🧪 Email Login Test Console
        </h2>
        
        {/* Current Status */}
        <div className="bg-gray-50 p-4 rounded-2xl mb-6 border-2 border-gray-200">
          <h3 className="font-bold text-lg mb-2">Current Status:</h3>
          <p><strong>Logged in:</strong> {user ? '✅ Yes' : '❌ No'}</p>
          {user && (
            <>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.id}</p>
            </>
          )}
        </div>

        {/* Test Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-bold mb-2">Test Email:</label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500"
              placeholder="test@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Test Password:</label>
            <input
              type="password"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500"
              placeholder="password123"
            />
          </div>
        </div>

        {/* Test Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <button
            onClick={testEmailRegistration}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Test Registration
          </button>
          
          <button
            onClick={testEmailLogin}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Test Login
          </button>
          
          <button
            onClick={testDirectSupabaseLogin}
            disabled={isLoading}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Test Direct Login
          </button>
          
          <button
            onClick={testLogout}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Test Logout
          </button>
          
          <button
            onClick={runFullTest}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-colors col-span-1 md:col-span-2"
          >
            {isLoading ? '🔄 Running Tests...' : '🚀 Run Full Test'}
          </button>
          
          <button
            onClick={clearResults}
            disabled={isLoading}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Clear Results
          </button>
        </div>

        {/* Test Results */}
        <div className="bg-black text-green-400 p-4 rounded-2xl border-2 border-gray-700 font-mono text-sm min-h-[300px] max-h-[400px] overflow-y-auto">
          <div className="mb-2 text-blue-400 font-bold">📊 Test Results Console:</div>
          {testResults.length === 0 ? (
            <div className="text-gray-500">Click a test button to start testing...</div>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="mb-1">
                {result}
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">
            This test will verify email authentication is working properly in your React app.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/register" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Go to Register Page
            </a>
            <a 
              href="/login" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Go to Login Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailLoginTest;
