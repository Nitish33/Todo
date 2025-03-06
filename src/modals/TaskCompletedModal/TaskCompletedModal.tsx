import React from 'react';
import H1 from '@components/AppText/H1';
import AppText from '@components/AppText';
import {ModalProps, View} from 'react-native';
import GenericModal from '@components/GenericModal';
import useUpdateTodo from '@services/useUpdateTodo';
import AppButton from '@components/AppButton/AppButton';

import Styles from './styles';

interface Props extends ModalProps {
  markCompleted?: boolean;
  task?: TaskType;
  onClose: () => void;
}
/**
 * This Modal can be used for marking pending and completed
 */
export default function TaskCompletedModal(props: Props) {
  const {task, markCompleted, onClose, ...rest} = props;

  const {mutateAsync: updateTodo} = useUpdateTodo();

  const onMarkComplete = () => {
    if (!task) {
      return;
    }

    task.completed = !!markCompleted;

    updateTodo({task: task});
    onClose?.();
  };

  const label = markCompleted ? 'completed' : 'pending';

  return (
    <GenericModal {...rest}>
      <View style={Styles.container}>
        <View style={Styles.contentContainer}>
          <H1>{`Mark ${label}`}</H1>

          <AppText style={{lineHeight: 24}}>
            Are you sure you want to mark this task {label}. Head over to{' '}
            {label} tab if you see to find it later
          </AppText>
        </View>

        <View style={Styles.button}>
          <AppButton title="Close" type="secondary" onPress={onClose} />

          <AppButton
            type="success"
            title={`Mark ${label}`}
            onPress={onMarkComplete}
          />
        </View>
      </View>
    </GenericModal>
  );
}
