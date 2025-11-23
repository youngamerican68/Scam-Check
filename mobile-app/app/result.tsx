// mobile-app/app/result.tsx
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../components/Header';
import VerdictCard from '../components/VerdictCard';
import PrimaryButton from '../components/PrimaryButton';
import { ScamCheckResult } from '../types/scam';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse the result from route params
  let result: ScamCheckResult | null = null;
  try {
    if (params.resultData && typeof params.resultData === 'string') {
      result = JSON.parse(params.resultData) as ScamCheckResult;
    }
  } catch (error) {
    console.error('Failed to parse result data:', error);
  }

  // If no valid result, show error and go back
  if (!result) {
    Alert.alert(
      'Error',
      'Could not load the analysis result. Please try again.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
    return null;
  }

  const handleCheckAnother = () => {
    router.back();
  };

  const handleShareResult = () => {
    // FUTURE: Implement native share functionality
    // For now, just show a placeholder alert
    Alert.alert(
      'Share Result',
      'Share functionality will be added in a future update. For now, you can take a screenshot of this result.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Header showSubtitle={false} />

      <View style={styles.content}>
        <VerdictCard result={result} />

        <View style={styles.actions}>
          <PrimaryButton
            label="Check Another Message"
            onPress={handleCheckAnother}
            variant="primary"
            style={styles.primaryAction}
          />

          <PrimaryButton
            label="Share Result (Coming Soon)"
            onPress={handleShareResult}
            variant="secondary"
            style={styles.secondaryAction}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  actions: {
    marginTop: 20,
    gap: 12,
  },
  primaryAction: {
    marginBottom: 0,
  },
  secondaryAction: {
    marginBottom: 0,
  },
});
