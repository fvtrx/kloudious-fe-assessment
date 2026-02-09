import { TextInputProps } from 'react-native';

export type InputType =
  | 'email'
  | 'password'
  | 'text'
  | 'number'
  | 'phone'
  | 'name'
  | 'creditCard'
  | 'address'
  | 'numeric';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  type?: InputType;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  containerStyle?: object;
  inputStyle?: object;
  labelStyle?: object;
}
