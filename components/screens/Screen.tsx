import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {verticalSacled} from '../../constants/sizes.ts';

interface screenProps {
  children: ReactNode;
}

/**
 * @description Just a container which render it child in the safe area so that it shouldn't overlap with system widgets or icons.
 * @param children react native component which will be rendered
 */
const Screen: React.FC<screenProps> = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: verticalSacled(4),
    backgroundColor: '#fff',
   paddingTop:'3%'
  },
});
export default Screen;
