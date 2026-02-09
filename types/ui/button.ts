import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loadingColor?: string;
  iconPosition?: 'left' | 'right';
}
