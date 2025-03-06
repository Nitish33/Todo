import React from 'react';
import {TextProps} from 'react-native';

import Styles from './styles';
import AppText from './AppText';

export default function H1(props: TextProps) {
  return <AppText {...props} style={[Styles.h1, props.style]} />;
}
