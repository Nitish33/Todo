import React from 'react';
import {Text, TextProps} from 'react-native';

import Styles from './styles';

export default function AppText(props: TextProps) {
  const {style, ...rest} = props;

  return <Text style={[Styles.text, style]} {...rest} />;
}
