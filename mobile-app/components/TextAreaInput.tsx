// mobile-app/components/TextAreaInput.tsx
import React from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle } from 'react-native';

interface TextAreaInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  style?: ViewStyle;
  editable?: boolean;
}

export default function TextAreaInput({
  value,
  onChangeText,
  placeholder,
  label,
  maxLength = 8000,
  style,
  editable = true,
}: TextAreaInputProps) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        multiline
        numberOfLines={8}
        maxLength={maxLength}
        editable={editable}
        textAlignVertical="top"
        autoCapitalize="sentences"
        autoCorrect={false}
      />

      <View style={styles.footer}>
        <Text style={styles.hint}>
          Copy and paste the entire message, including sender info if possible
        </Text>
        <Text style={[styles.counter, value.length > maxLength && styles.counterError]}>
          {value.length} / {maxLength}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#111827',
    minHeight: 160,
    lineHeight: 26,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  hint: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
    marginRight: 8,
  },
  counter: {
    fontSize: 14,
    color: '#6b7280',
  },
  counterError: {
    color: '#dc2626',
    fontWeight: '600',
  },
});
