import QueryHelper from '@query/helper';
import {useMutation} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAddNewTodo() {
  return useMutation({
    mutationKey: ['add_todo'],
    mutationFn: async (text: string) => {
      console.log('trying to mutate');
      const existingTodos = await AsyncStorage.getItem('todos');
      const list: Array<TaskType> = JSON.parse(existingTodos ?? '[]') ?? [];

      const updatedList = list.concat({
        title: text,
        isSynced: false,
        completed: false,
        id: new Date().getTime(),
        status: 'added',
      });

      return AsyncStorage.setItem('todos', JSON.stringify(updatedList));
    },
    onSuccess: QueryHelper.invalidateTaskData,
  });
}
