import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, Text} from 'react-native';
import {SIZES} from '../../constants/sizes.ts';
import {COLORS} from '../../constants/colors.ts';

interface buttonProps {
  text: string;

  onPress(event: GestureResponderEvent): void;
}

/**
 *@description primary button with black background and white text
 *
 * @param text string which will be displayed at the center of the button
 * @param onPress function passed to the onPress prop
 */
const PrimaryButton: React.FC<buttonProps> = ({text, onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: COLORS.primaryBlack,
  },
  text: {
    fontSize: SIZES.primaryButton,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: COLORS.offWhite,
  },
});

export default PrimaryButton;
