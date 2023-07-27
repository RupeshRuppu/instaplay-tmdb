import Logo from '../images/logo.svg';
import useOrientation from '../hooks/useOrientation';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {LANDSCAPE} from '../constants';

const Header = () => {
  const orientation = useOrientation();
  const sharedValue = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: sharedValue.value,
      padding: interpolate(sharedValue.value, [0, 56], [0, 16]),
    };
  });

  useEffect(() => {
    if (orientation === LANDSCAPE)
      sharedValue.value = withTiming(0, {duration: 200});
    else sharedValue.value = withTiming(56, {duration: 200});
  }, [orientation]);

  return (
    <Animated.View
      style={[{backgroundColor: '#263F61', padding: 16}, animatedStyles]}>
      <Logo />
    </Animated.View>
  );
};

export default Header;
