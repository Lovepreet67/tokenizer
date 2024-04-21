import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {scaled} from '../../constants/sizes.ts';

interface textButtonProps {
  text: string;
  align: 'left' | 'right';
  onPress: () => void;
}

/**
 * @description Text renderer which also handles the touch and can be used for forgotten password , already have an account etc.
 * @param text
 * @param align
 * @param onPress
 */

const TextButton: React.FC<textButtonProps> = ({text, align, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          align === 'left' ? styles.selfLeft : styles.selfRight,
          styles.text,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
    fontSize: scaled(15),
  },
  selfLeft: {
    alignSelf: 'flex-start',
  },
  selfRight: {
    alignSelf: 'flex-end',
  },
});
export default TextButton;
