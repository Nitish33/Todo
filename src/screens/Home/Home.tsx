import ScreenName from '@utils/screenNames';
import TaskCard from '@components/TaskCard';
import {useRoute} from '@react-navigation/native';
import EditTaskModal from '@modals/EditTaskModal';
import React, {useCallback, useState} from 'react';
import {HomeTabsParamList} from '@navigation/types';
import useGetTodoList from '@services/useGetTodoList';
import {FlatList, ListRenderItemInfo} from 'react-native';
import ScreenContainer from '@components/ScreenContainer';
import TaskCompletedModal from '@modals/TaskCompletedModal';
import AddTaskModal from '@modals/AddTaskModal/AddTaskModal';
import FloatingActionButton from '@components/FloatingActionButton';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

import Styles from './styles';

type RouteProps = MaterialTopTabScreenProps<HomeTabsParamList>;

export default function Home() {
  const {status} = useRoute<RouteProps['route']>().params;

  const {data} = useGetTodoList(status === 'completed');

  const [showAddModal, updateShowAddModal] = useState(false);

  const [showEditModal, updateShowEditModal] = useState<{
    visible: boolean;
    task?: TaskType;
  }>({
    visible: false,
    task: undefined,
  });

  const [showCompleteModal, updateShowCompleteModal] = useState<{
    visible: boolean;
    task?: TaskType;
  }>({
    visible: false,
    task: undefined,
  });

  const onEditTask = (task: TaskType) => {
    updateShowEditModal({
      visible: true,
      task,
    });
  };

  const onAddNewTask = () => {
    updateShowAddModal(true);
  };

  const onCompleteTask = (task: TaskType) => {
    updateShowCompleteModal({
      visible: true,
      task: task,
    });
  };

  const renderItem = useCallback((item: ListRenderItemInfo<TaskType>) => {
    return (
      <TaskCard
        task={item.item}
        onEdit={onEditTask}
        onMarkComplete={onCompleteTask}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: TaskType) => `${item.id}`, []);

  const closeAddNewTaskPopup = () => {
    updateShowAddModal(false);
  };

  const closeEditModal = () => {
    updateShowEditModal({visible: false});
  };

  const closeMarkCompletedModal = () => {
    updateShowCompleteModal({
      visible: false,
    });
  };

  return (
    <ScreenContainer name={ScreenName.HOME} withSafeArea={false}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={Styles.container}
      />

      <FloatingActionButton onPress={onAddNewTask} />

      <AddTaskModal visible={showAddModal} onClose={closeAddNewTaskPopup} />

      {showEditModal.visible && (
        <EditTaskModal
          visible={showEditModal.visible ?? false}
          task={showEditModal.task}
          onClose={closeEditModal}
        />
      )}

      {showCompleteModal.visible && (
        <TaskCompletedModal
          task={showCompleteModal.task}
          onClose={closeMarkCompletedModal}
          visible={showCompleteModal.visible}
          markCompleted={status !== 'completed'}
        />
      )}
    </ScreenContainer>
  );
}
