// mobile-app/app.config.ts
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Scam-Check One-Shot',
  slug: 'scam-check-granny-guard',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.scamcheck.grannyguard',
    // Future: Add share extension configuration here
    // infoPlist: {
    //   NSAppTransportSecurity: {
    //     NSAllowsArbitraryLoads: true // Only for local development
    //   }
    // }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.scamcheck.grannyguard',
    // Future: Add share intent filters here
    // intentFilters: [
    //   {
    //     action: 'android.intent.action.SEND',
    //     category: ['android.intent.category.DEFAULT'],
    //     data: { mimeType: 'text/plain' }
    //   }
    // ]
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro'
  },
  scheme: 'scamcheck',
  plugins: ['expo-router'],
  extra: {
    // API base URL - configure this for your environment
    // For local dev with web app running on localhost:3000
    // For iOS simulator: http://localhost:3000
    // For Android emulator: http://10.0.2.2:3000
    // For production: https://your-domain.com
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000'
  }
});
