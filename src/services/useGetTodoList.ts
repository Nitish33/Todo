import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useGetTodoList(completed: boolean = false) {
  return useQuery({
    queryKey: ['todo', completed],
    queryFn: async (): Promise<TaskType[]> => {
      const data = await AsyncStorage.getItem('todos');
      const list = JSON.parse(data ?? '[]') as Array<TaskType>;

      return list?.filter(
        post => completed === post.completed && post.status !== 'deleted',
      );
    },
  });
}
