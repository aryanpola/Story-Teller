import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Preferences } from '@capacitor/preferences';

// Check if the app is running on a native platform
export const isNativePlatform = (): boolean => {
  return Capacitor.isNativePlatform();
};

// Platform specific helpers
export const getPlatform = (): string => {
  return Capacitor.getPlatform();
};

// Initialize app - call this in App.tsx
export const initializeApp = async (): Promise<void> => {
  if (!isNativePlatform()) return;
  
  try {    // Configure status bar for iOS and Android
    if (Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android') {
      // Light style means light text on dark background
      await StatusBar.setStyle({ style: 'LIGHT' });
      await StatusBar.setBackgroundColor({ color: '#219EBC' });
    }
    
    // Hide the splash screen with a fade effect
    await SplashScreen.hide({
      fadeOutDuration: 500
    });
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};

// Storage helpers using Preferences plugin
export const storage = {
  set: async (key: string, value: any): Promise<void> => {
    await Preferences.set({
      key,
      value: JSON.stringify(value)
    });
  },
  
  get: async <T>(key: string): Promise<T | null> => {
    const result = await Preferences.get({ key });
    if (result.value) {
      return JSON.parse(result.value) as T;
    }
    return null;
  },
  
  remove: async (key: string): Promise<void> => {
    await Preferences.remove({ key });
  },
  
  clear: async (): Promise<void> => {
    await Preferences.clear();
  }
};
