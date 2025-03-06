import React, {PropsWithChildren} from 'react';
import {View, Modal, ModalProps} from 'react-native';

import Styles from './styles';

export default function GenericModal(props: PropsWithChildren<ModalProps>) {
  return (
    <Modal animationType="slide" {...props} transparent>
      <View style={Styles.container}>
        <View style={Styles.content}>{props.children}</View>
      </View>
    </Modal>
  );
}
