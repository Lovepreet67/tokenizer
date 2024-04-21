import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {scaled, SIZES, WEIGHTS} from '../../constants/sizes.ts';
import {COLORS} from '../../constants/colors.ts';

interface formErrorProps {
  text: string | undefined;
}

/**
 * @description Text type to show error occur while using useForm .
 * @param text
 */
const FormError: React.FC<formErrorProps> = ({text}) => {
  return text ? <Text style={styles.error}>{text}</Text> : null;
};

const styles = StyleSheet.create({
  error: {
    fontSize: SIZES.error,
    fontWeight: WEIGHTS.light,
    marginLeft: scaled(10),
    color: COLORS.error,
  },
});

export default FormError;
