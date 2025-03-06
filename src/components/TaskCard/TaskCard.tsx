import React from 'react';
import H1 from '@components/AppText/H1';
import {Pressable, View} from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import RadioButton from '@components/RadioButton';

import Styles from './styles';

interface Props {
  task: TaskType;

  onMarkComplete: (task: TaskType) => void;
  onEdit: (task: TaskType) => void;
}

export default function TaskCard(props: Props) {
  const {task, onEdit, onMarkComplete} = props;

  return (
    <Pressable
      style={[Styles.container, {borderColor: task.isSynced ? 'black' : 'red'}]}
      onPress={() => onMarkComplete(task)}>
      <View style={Styles.radio}>
        <RadioButton
          value={task.completed}
          onToggle={() => onMarkComplete(task)}
        />
      </View>

      <H1 style={Styles.title}>{task.title}</H1>

      <Pressable
        hitSlop={16}
        onPress={() => {
          onEdit?.(task);
        }}>
        <RemixIcon name="more-2-fill" color="white" />
      </Pressable>
    </Pressable>
  );
}
