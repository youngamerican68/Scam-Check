// mobile-app/components/VerdictCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScamCheckResult, ScamVerdict } from '../types/scam';

interface VerdictCardProps {
  result: ScamCheckResult;
}

interface VerdictStyle {
  backgroundColor: string;
  borderColor: string;
  titleColor: string;
  icon: string;
  title: string;
}

const VERDICT_STYLES: Record<ScamVerdict, VerdictStyle> = {
  high_scam: {
    backgroundColor: '#fef2f2',
    borderColor: '#dc2626',
    titleColor: '#991b1b',
    icon: '🚨',
    title: 'High Likelihood This Is a Scam',
  },
  suspicious: {
    backgroundColor: '#fffbeb',
    borderColor: '#f59e0b',
    titleColor: '#b45309',
    icon: '⚠️',
    title: 'Suspicious - Treat With Extreme Caution',
  },
  no_obvious_scam: {
    backgroundColor: '#f9fafb',
    borderColor: '#6b7280',
    titleColor: '#374151',
    icon: 'ℹ️',
    title: 'No Obvious Scam Signals Detected',
  },
};

export default function VerdictCard({ result }: VerdictCardProps) {
  const style = VERDICT_STYLES[result.verdict];
  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Verdict Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: style.backgroundColor,
            borderLeftColor: style.borderColor,
          },
        ]}
      >
        <Text style={[styles.title, { color: style.titleColor }]}>
          {style.icon} {style.title}
        </Text>
        <Text style={styles.summary}>{result.summary}</Text>
        <Text style={styles.confidence}>
          Analysis Confidence: {confidencePercent}%
        </Text>
      </View>

      {/* Critical Warning for High Risk */}
      {result.verdict === 'high_scam' && (
        <View style={styles.criticalWarning}>
          <Text style={styles.criticalTitle}>🛑 DO NOT INTERACT</Text>
          <Text style={styles.criticalText}>
            Do not reply, do not click any links, do not call any numbers, and do
            not send any money or information.
          </Text>
        </View>
      )}

      {/* Caution for Suspicious */}
      {result.verdict === 'suspicious' && (
        <View style={styles.cautionWarning}>
          <Text style={styles.cautionTitle}>⚠️ PROCEED WITH CAUTION</Text>
          <Text style={styles.cautionText}>
            Verify this message through official channels before taking any action.
            Do not use contact information provided in the message.
          </Text>
        </View>
      )}

      {/* Tactics Section */}
      {result.tactics.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            How they might be trying to trick you:
          </Text>
          {result.tactics.map((tactic, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{tactic}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Safe Steps Section */}
      <View style={styles.safeStepsSection}>
        <Text style={styles.safeStepsTitle}>✅ Safe next steps:</Text>
        {result.safeSteps.map((step, index) => (
          <View key={index} style={styles.safeStepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.safeStepText}>{step}</Text>
          </View>
        ))}
      </View>

      {/* General Reminder */}
      <View style={styles.reminder}>
        <Text style={styles.reminderTitle}>Remember:</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.reminderText}>
            Real companies never ask for payment via gift cards, wire transfers, or
            cryptocurrency
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.reminderText}>
            Real companies never threaten immediate action or arrest
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.reminderText}>
            When in doubt, hang up and call the official number yourself
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.reminderText}>
            It's always okay to say "no" or "let me think about it"
          </Text>
        </View>
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          <Text style={styles.disclaimerBold}>Important:</Text> This tool cannot
          guarantee safety or accuracy. When in doubt, ignore the message or
          contact the company using a known official phone number or website.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderLeftWidth: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 30,
  },
  summary: {
    fontSize: 18,
    color: '#1f2937',
    lineHeight: 26,
    marginBottom: 12,
  },
  confidence: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  criticalWarning: {
    backgroundColor: '#fef2f2',
    borderWidth: 2,
    borderColor: '#dc2626',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  criticalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#991b1b',
    marginBottom: 8,
  },
  criticalText: {
    fontSize: 16,
    color: '#991b1b',
    lineHeight: 24,
    fontWeight: '600',
  },
  cautionWarning: {
    backgroundColor: '#fffbeb',
    borderWidth: 2,
    borderColor: '#f59e0b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cautionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#b45309',
    marginBottom: 8,
  },
  cautionText: {
    fontSize: 16,
    color: '#b45309',
    lineHeight: 24,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 8,
  },
  bullet: {
    fontSize: 18,
    fontWeight: '700',
    color: '#dc2626',
    marginRight: 8,
    marginTop: 2,
  },
  listText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    flex: 1,
  },
  safeStepsSection: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#16a34a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  safeStepsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 12,
  },
  safeStepItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 8,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#16a34a',
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
  safeStepText: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 24,
    flex: 1,
  },
  reminder: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 22,
    flex: 1,
  },
  disclaimer: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#f59e0b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 22,
  },
  disclaimerBold: {
    fontWeight: '700',
  },
});
