import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useGetAllTodo() {
  return useQuery({
    queryKey: ['todo'],
    queryFn: async (): Promise<TaskType[]> => {
      const data = await AsyncStorage.getItem('todos');
      const list = JSON.parse(data ?? '[]') as Array<TaskType>;

      console.log('refetching');
      return [...list];
    },
  });
}
