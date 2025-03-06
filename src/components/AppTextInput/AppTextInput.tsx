import {View, Text, TextInput, TextInputProps} from 'react-native';
import React from 'react';
import Styles from './styles';

export default function AppTextInput(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      underlineColorAndroid={'transparent'}
      style={[Styles.container, props.style]}
    />
  );
}
