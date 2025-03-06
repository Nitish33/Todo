import HttpClient from '@network/HttpClient';
import {useMutation} from '@tanstack/react-query';

export default function useAddNewTodoRemote() {
  return useMutation({
    mutationKey: ['add_todo_remote'],
    mutationFn: async ({task}: {task: TaskType}) => {
      await HttpClient.Post('https://jsonplaceholder.typicode.com/posts', {
        title: task.title,
        body: '',
        userId: '',
      });

      return {
        id: new Date().getTime(),
      };
    },
  });
}
