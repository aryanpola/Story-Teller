/**
 * Storage service that works in both web and mobile environments
 * Uses LocalStorage for web and Preferences API for mobile
 */

import { Preferences } from '@capacitor/preferences';
import { isNativePlatform } from './capacitorService';

/**
 * Storage wrapper for both mobile and web platforms
 */
export const storage = {
  /**
   * Store data with the given key
   */
  set: async (key: string, value: any): Promise<void> => {
    const valueStr = JSON.stringify(value);
    
    if (isNativePlatform()) {
      // Mobile storage using Capacitor Preferences API
      await Preferences.set({ key, value: valueStr });
    } else {
      // Web storage using localStorage
      localStorage.setItem(key, valueStr);
    }
  },
  
  /**
   * Get data for the given key
   */
  get: async <T>(key: string): Promise<T | null> => {
    if (isNativePlatform()) {
      // Mobile storage using Capacitor Preferences API
      const { value } = await Preferences.get({ key });
      return value ? JSON.parse(value) as T : null;
    } else {
      // Web storage using localStorage
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    }
  },
  
  /**
   * Remove data for the given key
   */
  remove: async (key: string): Promise<void> => {
    if (isNativePlatform()) {
      // Mobile storage using Capacitor Preferences API
      await Preferences.remove({ key });
    } else {
      // Web storage using localStorage
      localStorage.removeItem(key);
    }
  },
  
  /**
   * Clear all stored data
   */
  clear: async (): Promise<void> => {
    if (isNativePlatform()) {
      // Mobile storage using Capacitor Preferences API
      await Preferences.clear();
    } else {
      // Web storage using localStorage
      localStorage.clear();
    }
  }
};
