# Interactive Storytelling Mobile App

This document explains how to build and run the mobile app version of the Interactive Storytelling platform.

## Requirements

- **Android Development:**
  - Android Studio
  - Android SDK
  - JDK 17 or newer

- **iOS Development:**
  - macOS computer
  - Xcode 13 or newer
  - CocoaPods

## Building and Running

### Android

1. **Build the web assets:**
   ```bash
   npm run cap:build
   ```

2. **Run on Android:**
   ```bash
   npm run cap:run:android
   ```

   Alternatively, open in Android Studio:
   ```bash
   npm run cap:open:android
   ```

### iOS

1. **Build the web assets:**
   ```bash
   npm run cap:build
   ```

2. **Run on iOS:**
   ```bash
   npm run cap:run:ios
   ```

   Alternatively, open in Xcode:
   ```bash
   npm run cap:open:ios
   ```

## Customizing the Mobile App

- **Icons & Splash Screens:** Place your source images in the `resources` folder:
  - `resources/icon.png` (1024x1024px)
  - `resources/splash.png` (2732x2732px)

  Then run:
  ```bash
  npm install @capacitor/assets --save-dev
  npx @capacitor/assets generate
  ```

- **Native Plugins:** To add additional Capacitor plugins:
  ```bash
  npm install @capacitor/plugin-name
  npx cap sync
  ```

## Mobile-Specific Features

The app is configured to:
- Work offline with user data stored in device storage
- Connect to the backend API
- Use native UI components when available
- Handle deep linking

## Troubleshooting

- **Android Build Issues:** Check Android Studio for any missing dependencies
- **iOS Build Issues:** Ensure CocoaPods is installed correctly
- **Network Errors:** The app is configured to connect to `localhost:3005` in development. Update `apiService.ts` with your production URL before deploying.

## Publishing

### Android
1. Build a release version in Android Studio
2. Generate a signed APK/Bundle
3. Submit to Google Play Store

### iOS
1. Create an App Store distribution profile
2. Archive the app in Xcode
3. Submit to App Store Connect

## Development Notes

- API endpoints are configured in `src/services/apiService.ts`
- Capacitor configuration is in `capacitor.config.ts`
- Native plugin initialization happens in `src/App.tsx`
