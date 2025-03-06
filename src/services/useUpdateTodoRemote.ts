import HttpClient from '@network/HttpClient';
import {useMutation} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useUpdateTodoRemote() {
  return useMutation({
    mutationKey: ['add_todo_remote'],
    mutationFn: ({task}: {task: TaskType}) => {
      return HttpClient.Put('https://jsonplaceholder.typicode.com/posts', {
        title: task.title,
        body: '',
        userId: '',
      });
    },
  });
}
