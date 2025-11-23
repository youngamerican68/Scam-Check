# Scam-Check One-Shot Mobile App

The mobile companion app for **Scam-Check One-Shot (The Granny Guard)** - your on-phone panic button for checking suspicious messages.

## Overview

This is a React Native app built with Expo that provides an easy-to-use mobile interface for checking suspicious text messages, emails, and chat messages for scam patterns. The app calls the existing Next.js backend API (`/api/check-scam`) to perform the analysis.

## Features

- ✅ **Simple text input** - Paste suspicious messages directly
- ✅ **Context selection** - Specify who the check is for (self, parent, other)
- ✅ **Clear verdicts** - Color-coded results with plain-English explanations
- ✅ **Actionable advice** - Specific tactics detected and safe next steps
- ✅ **Age-friendly design** - Large fonts, high contrast, simple navigation
- 🚧 **Share sheet integration** - Coming in future update

## Tech Stack

- **React Native** with **Expo** (~50.0.0)
- **Expo Router** for file-based navigation
- **TypeScript** for type safety
- **React Native StyleSheet** for styling

## Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Expo CLI (will be installed automatically)
- iOS Simulator (for Mac) or Android Emulator
- Backend API running (the Next.js web app)

## Installation

1. Navigate to the mobile app directory:
   ```bash
   cd mobile-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. Configure the API endpoint:

   Create a `.env` file (or set environment variables) with:
   ```env
   EXPO_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

   **Important platform-specific URLs:**

   - **iOS Simulator**: `http://localhost:3000`
   - **Android Emulator**: `http://10.0.2.2:3000` (Android's alias for host machine)
   - **Physical Device**: `http://YOUR_COMPUTER_IP:3000` (e.g., `http://192.168.1.100:3000`)
   - **Production**: `https://your-domain.com`

## Running the App

### Start the Expo development server:

```bash
npm start
# or
npx expo start
```

This will open Expo DevTools in your browser.

### Run on iOS Simulator:

```bash
npm run ios
# or
npx expo start --ios
```

Requires macOS with Xcode installed.

### Run on Android Emulator:

```bash
npm run android
# or
npx expo start --android
```

Requires Android Studio and an emulator set up.

### Run on Physical Device:

1. Install the **Expo Go** app on your iOS or Android device
2. Scan the QR code shown in the terminal or Expo DevTools
3. Make sure your device and computer are on the same network
4. Update the API URL to use your computer's local IP address

## Project Structure

```
mobile-app/
├── app/
│   ├── _layout.tsx         # Root layout with navigation stack
│   ├── index.tsx           # Main screen (text input & check button)
│   ├── result.tsx          # Result screen (shows verdict & advice)
│   └── onboarding.tsx      # How-to-use instructions
├── components/
│   ├── Header.tsx          # App header component
│   ├── PrimaryButton.tsx   # Large accessible button
│   ├── TextAreaInput.tsx   # Multi-line text input
│   └── VerdictCard.tsx     # Verdict display card
├── services/
│   └── api.ts              # API client for backend calls
├── types/
│   └── scam.ts             # TypeScript type definitions
├── app.config.ts           # Expo configuration
├── babel.config.js         # Babel configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

## API Integration

The app calls the existing Next.js backend:

**Endpoint**: `POST /api/check-scam`

**Request**:
```json
{
  "text": "suspicious message content",
  "contextWhoFor": "self" | "parent" | "other",
  "imageBase64": null
}
```

**Response**:
```json
{
  "verdict": "high_scam" | "suspicious" | "no_obvious_scam",
  "confidence": 0.85,
  "summary": "Plain-English explanation...",
  "tactics": ["tactic 1", "tactic 2"],
  "safeSteps": ["step 1", "step 2"]
}
```

## Development Tips

### Connecting to Local Backend

**Option 1: iOS Simulator**
```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000
```

**Option 2: Android Emulator**
```env
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:3000
```

**Option 3: Physical Device (same WiFi)**
```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.100:3000
```

Replace `192.168.1.100` with your computer's actual IP address.

### Debugging API Calls

The `services/api.ts` module logs all API calls to the console. Check the terminal running `expo start` for:
- Request URLs
- Response status codes
- Error messages

To check the configured API URL at runtime, the app shows connection details in error messages.

### Hot Reloading

Expo supports hot reloading. Save any file and the app will automatically reload. For certain changes (like `app.config.ts`), you may need to restart the dev server.

## Future Enhancements

The app is structured to support:

- [ ] **Share sheet integration** - Accept messages from iOS/Android share sheets
- [ ] **Image upload** - Take photos of messages or upload from gallery
- [ ] **History** - Save and review past scam checks
- [ ] **Notifications** - Alert when analysis is complete
- [ ] **Offline mode** - Basic heuristics when no internet
- [ ] **Multi-language support** - Translate UI and results

## Share Sheet Integration (Planned)

The code includes commented placeholders in `app/index.tsx` for share sheet integration:

```typescript
// FUTURE: Handle share intent / deep linking
// useEffect(() => {
//   const handleInitialUrl = async () => {
//     const initialUrl = await Linking.getInitialURL();
//     // Parse shared text from URL
//   };
//   handleInitialUrl();
// }, []);
```

To implement:
1. Configure iOS share extension in `app.config.ts`
2. Configure Android intent filters in `app.config.ts`
3. Uncomment and implement URL handling in `app/index.tsx`
4. Test with native share sheets

## Troubleshooting

### "Cannot connect to backend" error

1. Check that the Next.js backend is running (`npm run dev` in the root directory)
2. Verify the API URL is correct for your platform (see above)
3. Ensure your device/simulator is on the same network as your computer
4. Check firewall settings aren't blocking the connection
5. Try accessing the API URL directly in a browser first

### "Received an invalid response" error

- The backend may have returned unexpected data
- Check the backend logs for errors
- Verify the `/api/check-scam` endpoint is working correctly

### App crashes on launch

- Clear Expo cache: `npx expo start --clear`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

## Building for Production

### EAS Build (Recommended)

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Configure EAS:
   ```bash
   eas build:configure
   ```

3. Build for iOS:
   ```bash
   eas build --platform ios
   ```

4. Build for Android:
   ```bash
   eas build --platform android
   ```

### Update Production API URL

Before building for production, update the API URL in `app.config.ts`:

```typescript
extra: {
  apiBaseUrl: 'https://your-production-domain.com'
}
```

Or use environment variables:

```bash
EXPO_PUBLIC_API_BASE_URL=https://your-production-domain.com eas build --platform all
```

## License

Same as the parent project.

## Support

For questions or issues specific to the mobile app:
- Check the main project README
- Review Expo documentation: https://docs.expo.dev
- Create an issue in the repository

---

**Built with ❤️ to protect those we love.**
