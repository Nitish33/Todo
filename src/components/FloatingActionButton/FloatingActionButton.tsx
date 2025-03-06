import React from 'react';
import {Pressable} from 'react-native';
import RemixIcon from 'react-native-remix-icon';

import Styles from './styles';

interface Props {
  onPress: () => void;
}

export default function FloatingActionButton(props: Props) {
  return (
    <Pressable style={Styles.container} onPress={props.onPress}>
      <RemixIcon name="add-fill" color="white" size={32} />
    </Pressable>
  );
}
