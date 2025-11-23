// mobile-app/app/onboarding.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Header showSubtitle={false} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* What This App Does */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>🛡️</Text>
          <Text style={styles.sectionTitle}>What This App Does</Text>
          <Text style={styles.sectionText}>
            This app helps you check suspicious text messages, WhatsApp messages,
            and emails for scam patterns.
          </Text>
          <Text style={styles.sectionText}>
            We look for common scam tactics like:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Urgency and time pressure</Text>
            <Text style={styles.bullet}>• Threats and fear tactics</Text>
            <Text style={styles.bullet}>• Unusual payment requests</Text>
            <Text style={styles.bullet}>• Requests for personal information</Text>
            <Text style={styles.bullet}>• Authority impersonation</Text>
          </View>
        </View>

        {/* How to Use - Direct Method */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>📱</Text>
          <Text style={styles.sectionTitle}>How to Use (Method 1: Direct)</Text>
          <View style={styles.stepList}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>
                Open the suspicious message in Messages, WhatsApp, or Email
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>
                Select and copy the message text (tap and hold, then "Copy")
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>
                Open this app (Scam-Check One-Shot)
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>
                Paste the message into the text box
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>5</Text>
              </View>
              <Text style={styles.stepText}>
                Tap "Check this for scams" and wait for the result
              </Text>
            </View>
          </View>
        </View>

        {/* How to Use - Share Sheet (Future) */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>↗️</Text>
          <Text style={styles.sectionTitle}>
            How to Use (Method 2: Share - Coming Soon)
          </Text>
          <Text style={styles.sectionText}>
            In a future update, you'll be able to share messages directly to this
            app:
          </Text>
          <View style={styles.stepList}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>
                Open the suspicious message
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>
                Tap the Share button (box with arrow)
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>
                Choose "Scam-Check (Granny Guard)" from the share menu
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>
                We'll open automatically and show you the analysis
              </Text>
            </View>
          </View>
        </View>

        {/* Important Reminders */}
        <View style={styles.warningSection}>
          <Text style={styles.warningTitle}>⚠️ Important Reminders</Text>
          <Text style={styles.warningText}>
            • This app is a <Text style={styles.warningBold}>helper tool</Text>,
            not a guarantee
          </Text>
          <Text style={styles.warningText}>
            • We are <Text style={styles.warningBold}>very conservative</Text> and
            may flag legitimate messages
          </Text>
          <Text style={styles.warningText}>
            • When in doubt, <Text style={styles.warningBold}>DO NOT</Text> click
            links or reply
          </Text>
          <Text style={styles.warningText}>
            • Always verify by calling the company using a{' '}
            <Text style={styles.warningBold}>known official number</Text>
          </Text>
          <Text style={styles.warningText}>
            • Real companies{' '}
            <Text style={styles.warningBold}>never ask for gift cards</Text> or
            immediate wire transfers
          </Text>
        </View>

        {/* Support Resources */}
        <View style={styles.resourcesSection}>
          <Text style={styles.resourcesTitle}>📞 Need More Help?</Text>
          <Text style={styles.resourceText}>
            <Text style={styles.resourceBold}>Report fraud to the FTC:</Text>{'\n'}
            Visit reportfraud.ftc.gov
          </Text>
          <Text style={styles.resourceText}>
            <Text style={styles.resourceBold}>
              National Elder Fraud Hotline:
            </Text>
            {'\n'}
            Call 1-833-FRAUD-11 (1-833-372-8311)
          </Text>
          <Text style={styles.resourceText}>
            <Text style={styles.resourceBold}>AARP Fraud Watch Network:</Text>
            {'\n'}
            Visit aarp.org/scams-fraud
          </Text>
        </View>

        {/* Back Button */}
        <PrimaryButton
          label="Got it, take me back"
          onPress={handleGoBack}
          variant="primary"
          style={styles.backButton}
        />
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
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 18,
    color: '#374151',
    lineHeight: 28,
    marginBottom: 12,
  },
  bulletList: {
    marginTop: 8,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
    marginBottom: 6,
  },
  stepList: {
    marginTop: 12,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  warningSection: {
    backgroundColor: '#fef3c7',
    borderWidth: 2,
    borderColor: '#f59e0b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#78350f',
    marginBottom: 12,
  },
  warningText: {
    fontSize: 16,
    color: '#78350f',
    lineHeight: 26,
    marginBottom: 8,
  },
  warningBold: {
    fontWeight: '700',
  },
  resourcesSection: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  resourcesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 12,
  },
  resourceText: {
    fontSize: 16,
    color: '#1e40af',
    lineHeight: 26,
    marginBottom: 12,
  },
  resourceBold: {
    fontWeight: '700',
  },
  backButton: {
    marginTop: 8,
  },
});
