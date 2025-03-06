import React, {useState} from 'react';
import H1 from '@components/AppText/H1';
import {View, ModalProps} from 'react-native';
import GenericModal from '@components/GenericModal';
import AppTextInput from '@components/AppTextInput';
import useAddNewTodo from '@services/useAddNewTodo';
import AppButton from '@components/AppButton/AppButton';

import Styles from './styles';

interface Props extends ModalProps {
  onClose: () => void;
}

export default function AddTaskModal(props: Props) {
  const {onClose} = props;

  const {mutateAsync: addNewTodo} = useAddNewTodo();
  const [text, updateText] = useState('');

  const onSave = () => {
    updateText('');
    addNewTodo(text);
    onClose?.();
  };

  const onDiscard = () => {
    updateText('');
    onClose?.();
  };

  return (
    <GenericModal {...props}>
      <View style={Styles.container}>
        <View style={Styles.contentContainer}>
          <H1>Add new task</H1>

          <AppTextInput value={text} onChangeText={updateText} />
        </View>

        <View style={Styles.button}>
          <AppButton title="Close" type="secondary" onPress={onDiscard} />
          <AppButton title="Save" type="success" onPress={onSave} />
        </View>
      </View>
    </GenericModal>
  );
}
