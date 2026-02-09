import { ButtonProps as ComponentProps } from '@/types/ui/button';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

export function Button({
  text,
  onPress,
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  loadingColor = '#ffffff',
  iconPosition = 'left',
}: ComponentProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={loadingColor} />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}

          <Text style={[styles.text, textStyle]}>{text}</Text>

          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  text: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#ffffff',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
};
