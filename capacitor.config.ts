import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.storytelling.app',
  appName: 'Interactive Storytelling',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    cleartext: true,
    hostname: 'localhost',
    allowNavigation: ['localhost', '10.0.2.2', '*.your-production-server.com']
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#FFB703"
    },
    StatusBar: {
      style: 'light',
      backgroundColor: "#219EBC",
      overlays: true,
      backgroundColorByHexString: "#219EBC"
    },
    Keyboard: {
      resize: 'body',
      style: 'dark'
    }
  },
  ios: {
    contentInset: "always",
    scrollEnabled: false
  },
  android: {
    overrideUserAgent: "Mozilla/5.0 StorytellingMobileApp",
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  // Ensure proper viewport behavior
  overrideUserAgent: "Mozilla/5.0 StorytellingMobileApp"
};

export default config;
