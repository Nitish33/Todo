import React, {useState} from 'react';
import H1 from '@components/AppText/H1';
import RemixIcon from 'react-native-remix-icon';
import GenericModal from '@components/GenericModal';
import AppTextInput from '@components/AppTextInput';
import useUpdateTodo from '@services/useUpdateTodo';
import {View, Pressable, ModalProps} from 'react-native';
import Styles from './styles';
import AppButton from '@components/AppButton/AppButton';

interface Props extends ModalProps {
  task?: TaskType;
  onClose: () => void;
}

export default function EditTaskModal(props: Props) {
  const {task, onClose, ...rest} = props;

  const [value, updateValue] = useState(task?.title ?? '');
  const {mutateAsync: updateTodo} = useUpdateTodo();

  const onDeletePress = () => {
    if (!task) {
      return;
    }

    updateTodo({task, deleted: true});
    onClose?.();
  };

  const onSavePress = () => {
    if (!task) {
      return;
    }

    task.title = value;
    updateTodo({task});
    onClose?.();
  };

  return (
    <GenericModal {...rest}>
      <View style={Styles.container}>
        <View style={Styles.contentContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <H1>Edit Task</H1>

            <Pressable hitSlop={16} onPress={onClose}>
              <RemixIcon name="close-line" color="white" />
            </Pressable>
          </View>

          <AppTextInput value={value} onChangeText={updateValue} />
        </View>

        <View style={Styles.button}>
          <AppButton title="Delete" type="secondary" onPress={onDeletePress} />
          <AppButton title="Save" type="success" onPress={onSavePress} />
        </View>
      </View>
    </GenericModal>
  );
}
