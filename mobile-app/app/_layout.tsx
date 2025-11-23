// mobile-app/app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f9fafb' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Scam Check',
          }}
        />
        <Stack.Screen
          name="result"
          options={{
            title: 'Analysis Result',
          }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            title: 'How to Use',
          }}
        />
      </Stack>
    </>
  );
}
