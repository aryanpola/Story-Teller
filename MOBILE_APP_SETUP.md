# Mobile App Conversion Guide

## What's Been Done

1. **Capacitor Integration**
   - Added Capacitor core, CLI, and essential plugins
   - Created capacitor.config.ts with appropriate settings
   - Added Android and iOS platforms
   - Updated package.json with Capacitor scripts

2. **Mobile App Features**
   - Created capacitorService.ts for native mobile functionality
   - Added splash screen and status bar configuration
   - Created cross-platform storage service (web/mobile)
   - Updated Auth context to work on both web and mobile
   - Modified API service to handle both environments
   - Created SVG templates for app icon and splash screen

3. **Build and Configuration**
   - Set up build and sync scripts
   - Updated network configuration for mobile platforms
   - Created directory structure for resources

## Next Steps

### 1. Complete Resource Generation

Convert the SVG files to actual PNG resources:

```bash
npm install @capacitor/assets --save-dev
npx @capacitor/assets generate
```

### 2. Test on Emulators

Run the app on emulators:

```bash
# For Android
npm run cap:run:android

# For iOS
npm run cap:run:ios
```

### 3. Native Development

Open the project in native IDEs for further customization:

```bash
# For Android
npm run cap:open:android

# For iOS
npm run cap:open:ios
```

### 4. Additional Mobile Features

Consider adding these mobile-specific features:

- **Push Notifications**: Install and configure `@capacitor/push-notifications`
- **Offline Support**: Implement data caching for offline use
- **Device Integration**: Add camera, file system, or device info plugins
- **Deep Linking**: Set up app to handle deep links

### 5. Deployment

Before publishing:

1. Update the bundle ID in `capacitor.config.ts`
2. Create production builds in Android Studio/Xcode
3. Set up proper signing certificates
4. Submit to app stores

## Development Tips

- Use `isNativePlatform()` check to provide mobile-specific features
- Test on actual devices regularly
- Keep web and mobile versions in sync
- For platform-specific code, check platform before executing:
  ```typescript
  if (Capacitor.getPlatform() === 'android') {
    // Android-specific code
  } else if (Capacitor.getPlatform() === 'ios') {
    // iOS-specific code
  }
  ```

## Documentation

For more information, refer to:
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Platform Guide](https://capacitorjs.com/docs/android)
- [iOS Platform Guide](https://capacitorjs.com/docs/ios)

## Troubleshooting Common Issues

### Java Version Incompatibility

If you encounter an error like:
```
error: invalid source release: 21
```

This means the project is trying to use Java 21 but your system has an older version. Fix it by:

1. Creating/updating `android/gradle.properties` to specify your Java version:
   ```
   org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
   org.gradle.java.home=C:\\Program Files\\Java\\jdk-17
   ```

2. Adding a Java compatibility fix in `android/java17-fix.gradle`:
   ```gradle
   allprojects {
       afterEvaluate { project ->
           if (project.hasProperty('android')) {
               project.android.compileOptions {
                   sourceCompatibility JavaVersion.VERSION_17
                   targetCompatibility JavaVersion.VERSION_17
               }
           }
       }
   }
   ```

3. Applying this fix in root `android/build.gradle`:
   ```gradle
   apply from: "variables.gradle"
   apply from: "java17-fix.gradle"
   ```

### Android SDK Not Found

If you see an error about missing Android SDK:
```
SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable...
```

Create a `local.properties` file in the `android` folder with this content:
```
sdk.dir=C:\\Users\\<YourUsername>\\AppData\\Local\\Android\\Sdk
```

### Network Connection Issues

If the app installs but can't connect to your backend:
1. Make sure your phone and computer are on the same WiFi network
2. Update the API URL in `src/services/apiService.ts` to use your computer's IP address
3. Verify no firewall is blocking the connection
