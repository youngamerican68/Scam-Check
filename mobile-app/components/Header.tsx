// mobile-app/components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  showSubtitle?: boolean;
}

export default function Header({ showSubtitle = true }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛡️ Scam‑Check One‑Shot</Text>
      {showSubtitle && (
        <Text style={styles.subtitle}>A second opinion for your panic</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
