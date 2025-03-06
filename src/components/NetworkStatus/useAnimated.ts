import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function useAnimated() {
  const animated = useSharedValue(0);
  const {bottom} = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom,
      transform: [
        {translateY: interpolate(animated.value, [0, 0.5, 1], [100, 100, 0])},
      ],
    };
  }, [bottom]);

  return {
    animated,
    animatedStyle,
  };
}
