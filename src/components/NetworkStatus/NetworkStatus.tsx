import React, {useEffect} from 'react';
import AppText from '@components/AppText';
import {useNetInfo} from '@react-native-community/netinfo';
import Animated, {withTiming} from 'react-native-reanimated';

import Styles from './styles';
import useAnimated from './useAnimated';

export default function NetworkStatus() {
  const {isInternetReachable} = useNetInfo();

  const {animated, animatedStyle} = useAnimated();

  useEffect(() => {
    animated.value = withTiming(isInternetReachable ? 0 : 1, {duration: 1000});
  }, [isInternetReachable]);

  return (
    <Animated.View style={[Styles.container, animatedStyle]}>
      <AppText>
        {isInternetReachable ? 'Internet connected' : 'No Internet connection'}
      </AppText>
    </Animated.View>
  );
}
