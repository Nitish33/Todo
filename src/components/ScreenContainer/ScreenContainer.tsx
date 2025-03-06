import {View} from 'react-native';
import ScreenName from '@utils/screenNames';
import React, {PropsWithChildren} from 'react';
import useGetTopInset from '@hooks/useGetTopInset';

import Styles from './styles';

interface Props {
  withSafeArea?: boolean;
  name: ScreenName;
}

export default function ScreenContainer(props: PropsWithChildren<Props>) {
  const {withSafeArea = true} = props;
  const topInset = useGetTopInset();

  return (
    <View
      style={[Styles.container, {paddingTop: !withSafeArea ? 0 : topInset}]}>
      {props.children}
    </View>
  );
}
