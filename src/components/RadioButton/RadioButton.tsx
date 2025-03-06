import React from 'react';
import {View, Pressable} from 'react-native';

import Styles from './styles';

interface Props {
  value: boolean;
  onToggle: (value: boolean) => void;
}

export default function RadioButton(props: Props) {
  const {value, onToggle} = props;

  return (
    <Pressable
      style={Styles.container}
      hitSlop={16}
      onPress={() => onToggle(!value)}>
      {value && <View style={Styles.content} />}
    </Pressable>
  );
}
