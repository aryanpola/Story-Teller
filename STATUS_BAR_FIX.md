# Status Bar and UI Fixes

This document outlines the fixes implemented to address issues with top content cutoff and UI consistency.

## Top Content Cutoff Fix

The top content was being cut off by the status bar on Android devices. The following changes were made to fix this issue:

1. **Increased Status Bar Padding**
   - Increased status bar height padding in the Header component from 24px to 36px
   - Added special handling for iOS and Android status bars using CSS variables

2. **Enhanced Layout Component**
   - Added mobile-specific container padding
   - Improved status bar detection logic for different mobile devices and view modes
   - Added event listeners to dynamically adjust padding on resize

3. **Updated Capacitor Configuration**
   - Enhanced StatusBar plugin settings in capacitor.config.ts
   - Added androidOverlaysWebView and androidNavigationBarVisible options
   - Set consistent colors for status bar and navigation bar

4. **CSS Improvements**
   - Added safe area insets handling for notched devices
   - Created mobile-specific container padding class
   - Added special handling for iOS and Android using feature detection

## Language Selector Removal from Header

The language selector was removed from the header since it's already present in the sidebar menu:

1. **Header Component Update**
   - Removed language selector from the desktop navigation
   - Kept the language selector only in the sidebar menu for consistency
   - Updated comments in the code to reflect the changes

## Testing

These changes were tested on an Android device (OnePlus 9) to ensure:
- The top content is not cut off by the status bar
- The sidebar has proper padding at the top
- The language selector is only accessible from the sidebar menu
- The UI is consistent across different screen sizes

## Additional Notes

- The status bar padding is dynamic and will adjust based on device type and orientation
- Safe area insets are used where available to provide better compatibility with notched devices
- Additional CSS has been added for iOS-specific handling
