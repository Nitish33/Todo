import {View, Text} from 'react-native';
import React from 'react';
import ScreenContainer from '@components/ScreenContainer';
import ScreenName from '@utils/screenNames';
import AppText from '@components/AppText';

// Not used
export default function EditTask() {
  return (
    <ScreenContainer name={ScreenName.EDIT_TASK}>
      <AppText>EditTask</AppText>
    </ScreenContainer>
  );
}
