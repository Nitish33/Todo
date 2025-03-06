import QueryHelper from '@query/helper';
import {useMutation} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useUpdateTodo() {
  return useMutation({
    mutationKey: ['update_todo'],
    mutationFn: async ({
      task,
      deleted,
    }: {
      task: TaskType;
      deleted?: boolean;
    }) => {
      const existingTodos = await AsyncStorage.getItem('todos');
      const list: Array<TaskType> = JSON.parse(existingTodos ?? '[]') ?? [];

      // find index
      const index = list.findIndex(item => item.id === task.id);

      list.splice(index, 1, task);

      task.isSynced = false;
      task.status = deleted ? 'deleted' : 'updated';

      return AsyncStorage.setItem('todos', JSON.stringify(list));
    },

    onSuccess: QueryHelper.invalidateTaskData,
  });
}
