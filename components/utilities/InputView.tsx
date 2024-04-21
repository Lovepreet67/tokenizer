import React, {ReactNode, useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {scaled, verticalSacled} from '../../constants/sizes.ts';

/**
 * @description View which will render the children prop inside a keyboard avoiding view so that forms ar not overlapped by keyboard.
 * @param children
 * @param offset
 */
const InputView: React.FC<{children: ReactNode; offset: number}> = ({
  children,
  offset,
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View
      style={[
        styles.outerContainer,
        isKeyboardVisible ? styles.atend : styles.aligncenter,
      ]}>
      <KeyboardAvoidingView>
        {/*// behavior={'position'}*/}
        {/*// keyboardVerticalOffset={offset}*/}
        <View style={styles.container}>{children}</View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  outerContainer: {
    height: '100%',
    display: 'flex',
  },
  container: {
    paddingHorizontal: scaled(20),
    display: 'flex',
    flexDirection: 'column',
    gap: verticalSacled(10),
    alignItems: 'stretch',
  },
  aligncenter: {
    justifyContent: 'center',
  },
  atend: {
    justifyContent: 'flex-end',
    paddingBottom: '10%',
  },
});
export default InputView;
