import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/colors.ts';
import {scaled} from '../../constants/sizes.ts';

const startRotationAnimation = (rotationDegree: Animated.Value): void => {
  Animated.loop(
    Animated.timing(rotationDegree, {
      toValue: 360,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();
};

/**
 * @description Simple Loading animation.
 */

const Loading = () => {
  const rotationDegree = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    startRotationAnimation(rotationDegree);
  }, [rotationDegree]);
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container} accessibilityRole="progressbar">
        <View style={[styles.background]} />
        <Animated.View
          style={[
            styles.progress,
            {
              transform: [
                {
                  rotateZ: rotationDegree.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    width: scaled(64),
    height: scaled(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: scaled(32),
    borderWidth: scaled(10),
    opacity: 0.25,
    borderColor: COLORS.primaryGrey,
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: scaled(32),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderWidth: scaled(10),
    position: 'absolute',
    borderColor: COLORS.primaryBlack,
  },
});

export default Loading;
