import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '@utils/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const containerStyle = [
    styles.container,
    styles[`container_${variant}`],
    styles[`container_${size}`],
    disabled && styles.disabled,
    style,
  ];

  const textStyleArray = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyleArray}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  container_primary: {
    backgroundColor: COLORS.primary,
  },
  container_secondary: {
    backgroundColor: COLORS.primaryDark,
  },
  container_outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  container_small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  container_medium: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  container_large: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
  text_primary: {
    color: COLORS.background,
  },
  text_secondary: {
    color: COLORS.background,
  },
  text_outline: {
    color: COLORS.primary,
  },
  text_small: {
    fontSize: FONT_SIZES.sm,
  },
  text_medium: {
    fontSize: FONT_SIZES.md,
  },
  text_large: {
    fontSize: FONT_SIZES.lg,
  },
});

export default Button;
