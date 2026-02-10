import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  CreditCard,
  MapPin,
  Hash,
} from 'lucide-react-native';
import { InputProps as ComponentProps, InputType } from '@/types/ui/input';

const getInputConfig = (type: InputType) => {
  const configs = {
    email: {
      keyboardType: 'email-address' as KeyboardTypeOptions,
      autoCapitalize: 'none' as const,
      autoComplete: 'email' as const,
      icon: Mail,
      placeholder: 'your.email@example.com',
      secureTextEntry: false,
    },
    password: {
      keyboardType: 'default' as KeyboardTypeOptions,
      autoCapitalize: 'none' as const,
      autoComplete: 'password' as const,
      icon: Lock,
      placeholder: 'Enter your password',
      secureTextEntry: true,
    },
    text: {
      keyboardType: 'default' as KeyboardTypeOptions,
      autoCapitalize: 'sentences' as const,
      autoComplete: 'off' as const,
      icon: null,
      placeholder: 'Enter text',
      secureTextEntry: false,
    },
    number: {
      keyboardType: 'number-pad' as KeyboardTypeOptions,
      autoCapitalize: 'none' as const,
      autoComplete: 'off' as const,
      icon: Hash,
      placeholder: '0',
      secureTextEntry: false,
    },
    numeric: {
      keyboardType: 'numeric' as KeyboardTypeOptions,
      autoCapitalize: 'none' as const,
      autoComplete: 'off' as const,
      icon: Hash,
      placeholder: '0.00',
      secureTextEntry: false,
    },
    phone: {
      keyboardType: 'phone-pad' as KeyboardTypeOptions,
      autoCapitalize: 'none' as const,
      autoComplete: 'tel' as const,
      icon: Phone,
      placeholder: '+1 (555) 000-0000',
      secureTextEntry: false,
    },
    name: {
      keyboardType: 'default' as KeyboardTypeOptions,
      autoCapitalize: 'words' as const,
      autoComplete: 'name' as const,
      icon: User,
      placeholder: 'John Doe',
      secureTextEntry: false,
    },
    creditCard: {
      keyboardType: 'number-pad' as KeyboardTypeOptions,
      autoCapitalize: 'none' as const,
      autoComplete: 'cc-number' as const,
      icon: CreditCard,
      placeholder: '1234 5678 9012 3456',
      secureTextEntry: false,
    },
    address: {
      keyboardType: 'default' as KeyboardTypeOptions,
      autoCapitalize: 'words' as const,
      autoComplete: 'street-address' as const,
      icon: MapPin,
      placeholder: '123 Main Street',
      secureTextEntry: false,
    },
  };

  return configs[type] || configs.text;
};

export const Input: React.FC<ComponentProps> = ({
  type = 'text',
  label,
  value,
  onChangeText,
  error,
  leftIcon,
  rightIcon,
  showPasswordToggle = true,
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const config = getInputConfig(type);
  const IconComponent = config.icon;

  // Determine if we should show the password toggle
  const shouldShowPasswordToggle =
    type === 'password' && showPasswordToggle && !rightIcon;

  // Determine secure text entry
  const secureText =
    type === 'password' && config.secureTextEntry && !showPassword;

  // Handle left icon
  const renderLeftIcon = () => {
    if (leftIcon) return leftIcon;
    if (IconComponent && type !== 'text') {
      return (
        <View style={styles.leftIconContainer}>
          <IconComponent size={20} color={isFocused ? '#111827' : '#9CA3AF'} />
        </View>
      );
    }
    return null;
  };

  // Handle right icon (password toggle or custom)
  const renderRightIcon = () => {
    if (shouldShowPasswordToggle) {
      return (
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={() => setShowPassword(!showPassword)}
          activeOpacity={0.7}
        >
          {showPassword ? (
            <EyeOff size={20} color="#6B7280" />
          ) : (
            <Eye size={20} color="#6B7280" />
          )}
        </TouchableOpacity>
      );
    }
    if (rightIcon) {
      return <View style={styles.rightIconContainer}>{rightIcon}</View>;
    }
    return null;
  };

  // Format value for specific types
  const handleTextChange = (text: string) => {
    let formattedText = text;

    switch (type) {
      case 'phone':
        // Remove all non-numeric characters
        const cleaned = text.replace(/\D/g, '');
        // Format as MY phone number
        if (cleaned.length <= 3) {
          formattedText = cleaned;
        } else if (cleaned.length <= 7) {
          formattedText = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        } else if (cleaned.length <= 10) {
          formattedText = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
        } else {
          formattedText = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 10)}`;
        }
        break;

      case 'creditCard':
        // Format credit card number with spaces
        const cardCleaned = text.replace(/\s/g, '');
        const formatted =
          cardCleaned.match(/.{1,4}/g)?.join(' ') || cardCleaned;
        formattedText = formatted.slice(0, 19); // Max 16 digits + 3 spaces
        break;

      case 'number':
      case 'numeric':
        // Only allow numbers and decimal point for numeric
        if (type === 'numeric') {
          formattedText = text.replace(/[^0-9.]/g, '');
          // Ensure only one decimal point
          const parts = formattedText.split('.');
          if (parts.length > 2) {
            formattedText = parts[0] + '.' + parts.slice(1).join('');
          }
        } else {
          formattedText = text.replace(/[^0-9]/g, '');
        }
        break;
    }

    onChangeText(formattedText);
  };

  const hasLeftIcon = !!renderLeftIcon();
  const hasRightIcon = !!renderRightIcon();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text
        style={[
          styles.label,
          (isFocused || value) && styles.labelFocused,
          error && styles.labelError,
          labelStyle,
        ]}
      >
        {label}
      </Text>

      <View style={styles.inputWrapper}>
        {renderLeftIcon()}

        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.inputError,
            hasLeftIcon && styles.inputWithLeftIcon,
            hasRightIcon && styles.inputWithRightIcon,
            inputStyle,
          ]}
          value={value}
          onChangeText={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={config.keyboardType}
          autoCapitalize={config.autoCapitalize}
          autoComplete={config.autoComplete}
          secureTextEntry={secureText}
          placeholderTextColor="#9CA3AF"
          placeholder={config.placeholder}
          {...textInputProps}
        />

        {renderRightIcon()}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 8,
    fontWeight: '500',
  },
  labelFocused: {
    color: '#111827',
  },
  labelError: {
    color: '#EF4444',
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 52,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FAFAFA',
  },
  inputFocused: {
    borderColor: '#111827',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputWithLeftIcon: {
    paddingLeft: 48,
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
  leftIconContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
    padding: 4,
  },
  errorContainer: {
    marginTop: 6,
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '500',
  },
});
