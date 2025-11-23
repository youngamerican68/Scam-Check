// mobile-app/app/index.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
// import * as Linking from 'expo-linking'; // Uncomment for share intent handling
import Header from '../components/Header';
import TextAreaInput from '../components/TextAreaInput';
import PrimaryButton from '../components/PrimaryButton';
import { checkScam, ApiError, getConfiguredApiUrl } from '../services/api';
import { ContextWhoFor } from '../types/scam';

export default function IndexScreen() {
  const router = useRouter();

  // Form state
  const [messageText, setMessageText] = useState('');
  const [contextWhoFor, setContextWhoFor] = useState<ContextWhoFor>('self');
  const [isLoading, setIsLoading] = useState(false);

  // FUTURE: Handle share intent / deep linking
  // This is where you would integrate share sheet functionality
  useEffect(() => {
    // Example: Handle initial URL when app is opened via share intent
    // Uncomment and implement when adding native share extension

    // const handleInitialUrl = async () => {
    //   const initialUrl = await Linking.getInitialURL();
    //   if (initialUrl) {
    //     // Parse the URL and extract shared text
    //     // For example, if using a custom scheme like scamcheck://share?text=...
    //     const { queryParams } = Linking.parse(initialUrl);
    //     if (queryParams?.text && typeof queryParams.text === 'string') {
    //       setMessageText(queryParams.text);
    //     }
    //   }
    // };

    // handleInitialUrl();

    // Also listen for URLs while app is running
    // const subscription = Linking.addEventListener('url', (event) => {
    //   const { queryParams } = Linking.parse(event.url);
    //   if (queryParams?.text && typeof queryParams.text === 'string') {
    //     setMessageText(queryParams.text);
    //   }
    // });

    // return () => subscription.remove();
  }, []);

  const handleCheckScam = async () => {
    // Validation
    const trimmedText = messageText.trim();
    if (!trimmedText) {
      Alert.alert(
        'Message Required',
        'Please enter or paste the suspicious message text.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (trimmedText.length > 8000) {
      Alert.alert(
        'Message Too Long',
        'Please shorten the message to 8,000 characters or less.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Start analysis
    setIsLoading(true);

    try {
      const result = await checkScam({
        text: trimmedText,
        contextWhoFor,
        imageBase64: null, // Image upload can be added in future versions
      });

      // Navigate to result screen with the analysis result
      router.push({
        pathname: '/result',
        params: {
          resultData: JSON.stringify(result),
        },
      });
    } catch (error) {
      console.error('Scam check failed:', error);

      // Show user-friendly error message
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : 'We couldn\'t analyze this message right now. When in doubt, DO NOT reply or click anything. Try again later or call someone you trust.';

      Alert.alert(
        'Analysis Failed',
        errorMessage,
        [
          { text: 'OK' },
          {
            text: 'Check Connection',
            onPress: () => {
              Alert.alert(
                'API Configuration',
                `The app is trying to connect to:\n\n${getConfiguredApiUrl()}\n\n` +
                'Make sure:\n' +
                '• The backend server is running\n' +
                '• You are connected to the internet\n' +
                '• The API URL is correctly configured',
                [{ text: 'OK' }]
              );
            },
          },
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToOnboarding = () => {
    router.push('/onboarding');
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Check a Message for Scams</Text>
          <Text style={styles.instructionsText}>
            Paste any suspicious email, text, or message below. We'll analyze it
            for common scam patterns and social engineering tactics.
          </Text>
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyNotice}>
          <Text style={styles.privacyTitle}>🔒 Privacy & Safety Notice</Text>
          <Text style={styles.privacyText}>
            • <Text style={styles.privacyBold}>Never upload</Text> passwords, full
            card numbers, or sensitive IDs
          </Text>
          <Text style={styles.privacyText}>
            • We will <Text style={styles.privacyBold}>not contact you</Text> or
            anyone mentioned in the messages
          </Text>
          <Text style={styles.privacyText}>
            • This check is <Text style={styles.privacyBold}>anonymous</Text> - we
            don't store your data
          </Text>
        </View>

        {/* Message Input */}
        <TextAreaInput
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Paste the suspicious text message here, or share it to this app from Messages..."
          label="Suspicious message *"
          maxLength={8000}
        />

        {/* Context Selection */}
        <View style={styles.contextSection}>
          <Text style={styles.contextLabel}>Who is this check for?</Text>
          <View style={styles.contextButtons}>
            <TouchableOpacity
              style={[
                styles.contextButton,
                contextWhoFor === 'self' && styles.contextButtonActive,
              ]}
              onPress={() => setContextWhoFor('self')}
            >
              <Text
                style={[
                  styles.contextButtonText,
                  contextWhoFor === 'self' && styles.contextButtonTextActive,
                ]}
              >
                Me
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.contextButton,
                contextWhoFor === 'parent' && styles.contextButtonActive,
              ]}
              onPress={() => setContextWhoFor('parent')}
            >
              <Text
                style={[
                  styles.contextButtonText,
                  contextWhoFor === 'parent' && styles.contextButtonTextActive,
                ]}
              >
                Parent/Grandparent
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.contextButton,
                contextWhoFor === 'other' && styles.contextButtonActive,
              ]}
              onPress={() => setContextWhoFor('other')}
            >
              <Text
                style={[
                  styles.contextButtonText,
                  contextWhoFor === 'other' && styles.contextButtonTextActive,
                ]}
              >
                Someone Else
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.contextHint}>
            This helps us tailor our explanation to be most helpful
          </Text>
        </View>

        {/* Check Button */}
        <PrimaryButton
          label="🔍 Check this for scams"
          onPress={handleCheckScam}
          loading={isLoading}
          disabled={isLoading || !messageText.trim()}
          style={styles.checkButton}
        />

        <Text style={styles.loadingHint}>
          {isLoading ? 'Analyzing...' : 'Analysis typically takes 5-15 seconds'}
        </Text>

        {/* Help Link */}
        <TouchableOpacity
          style={styles.helpLink}
          onPress={handleGoToOnboarding}
        >
          <Text style={styles.helpLinkText}>
            ❓ How do I use this app?
          </Text>
        </TouchableOpacity>

        {/* Scam Warning Signs */}
        <View style={styles.warningSection}>
          <Text style={styles.warningTitle}>Common Scam Warning Signs:</Text>
          <View style={styles.warningGrid}>
            <View style={styles.warningItem}>
              <Text style={styles.warningEmoji}>⚡</Text>
              <Text style={styles.warningLabel}>Urgency & Pressure</Text>
            </View>
            <View style={styles.warningItem}>
              <Text style={styles.warningEmoji}>👮</Text>
              <Text style={styles.warningLabel}>Authority Claims</Text>
            </View>
            <View style={styles.warningItem}>
              <Text style={styles.warningEmoji}>💳</Text>
              <Text style={styles.warningLabel}>Unusual Payments</Text>
            </View>
            <View style={styles.warningItem}>
              <Text style={styles.warningEmoji}>🔒</Text>
              <Text style={styles.warningLabel}>Personal Data Requests</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  instructions: {
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  privacyNotice: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 22,
    marginBottom: 4,
  },
  privacyBold: {
    fontWeight: '700',
  },
  contextSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  contextLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  contextButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  contextButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  contextButtonActive: {
    borderColor: '#2563eb',
    backgroundColor: '#dbeafe',
  },
  contextButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
  },
  contextButtonTextActive: {
    color: '#1e40af',
  },
  contextHint: {
    fontSize: 14,
    color: '#6b7280',
    paddingHorizontal: 4,
  },
  checkButton: {
    marginTop: 8,
  },
  loadingHint: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 12,
  },
  helpLink: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  helpLinkText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  warningSection: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  warningGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  warningItem: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
  },
  warningEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  warningLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
});
