import React, {useRef, useEffect} from 'react';
import {View, Animated, Easing, ViewStyle} from 'react-native';
import {TextAnimationProps} from './text-animation.props';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function TextColorChangeAnimation(props: TextAnimationProps) {
  // grab the props
  const {text, textStyle} = props;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create a looped animation
    Animated.loop(
      Animated.sequence([
        // Change color to blue over 1 second
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        // Change color to red over 1 second
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  // Interpolate color value from 0 (white) to 1 (blue)
  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', 'blue'],
  });

  return (
    <View style={CONTAINEER}>
      <Animated.Text style={[textStyle, {color: interpolatedColor}]}>
        {text}
      </Animated.Text>
    </View>
  );
}

const CONTAINEER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
