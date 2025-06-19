/**
 * API Configuration for both web and mobile environments
 */

import axios from 'axios';
import { Capacitor } from '@capacitor/core';

// Helper to determine if we're in the mobile app or web browser
const isMobileApp = Capacitor.isNativePlatform();

// Base API URL configuration
const getBaseUrl = () => {
  // When running in the native app on a real device:
  if (isMobileApp) {
    // For Android emulator, use 10.0.2.2 to access the host machine's localhost
    if (Capacitor.getPlatform() === 'android') {
      return 'http://10.0.2.2:3005'; // Android emulator special IP for host's localhost
    }
    
    // For iOS simulator, use localhost
    if (Capacitor.getPlatform() === 'ios') {
      return 'http://localhost:3005'; // iOS simulator can access host's localhost directly
    }
      // For real devices, use your computer's IP address on the local network
    return 'http://192.168.158.81:3005'; // Using your computer's local IP address
  } 
  
  // When running in web browser
  return 'http://localhost:3005';
};

// Create axios instance with appropriate base URL
export const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (login required)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      if (isMobileApp) {
        // For mobile app, consider showing a login dialog
        console.error('Authentication required');
      } else {
        // For web, redirect to login page
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
