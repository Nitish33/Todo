import {useEffect, useRef} from 'react';
import QueryHelper from '@query/helper';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useAddNewTodoRemote from './useAddNewTodoRemote';
import useUpdateTodoRemote from './useUpdateTodoRemote';

export default function useSyncMutation() {
  const isSyncing = useRef(false);

  const {mutateAsync: addNewTodo} = useAddNewTodoRemote();
  const {mutateAsync: updateTodo} = useUpdateTodoRemote();

  const {data} = useQuery({
    queryKey: ['sync_todo'],
    queryFn: async () => {
      const data = await AsyncStorage.getItem('todos');
      const list = JSON.parse(data ?? '[]') as Array<TaskType>;

      return list.filter(data => !data.isSynced);
    },
  });

  const bulkUpdateAsyncStore = async (updatedTasks: Array<TaskType>) => {
    // first create a map for lookup
    const data = await AsyncStorage.getItem('todos');
    const list = JSON.parse(data ?? '[]') as Array<TaskType>;

    const map = new Map<number, TaskType>();
    updatedTasks.forEach(t => map.set(t.id, t));

    const newTaskList = list.map(l => (map.has(l.id) ? map.get(l.id) : l));
    AsyncStorage.setItem('todos', JSON.stringify(newTaskList));

    QueryHelper.invalidateTaskData();
  };

  useEffect(() => {
    if (isSyncing.current) {
      return;
    }

    if (!data?.length) {
      isSyncing.current = false;
      return;
    }

    Promise.allSettled(
      data.map(task =>
        task.remoteId ? updateTodo({task}) : addNewTodo({task}),
      ),
    )
      .then(response => {
        const updatedTasks = data.map((task, index) => {
          if (response[index].status !== 'fulfilled') {
            return task;
          }

          if (!task.remoteId) {
            task.remoteId = response[index]?.value?.id;
          }

          task.isSynced = true;
          return task;
        });

        bulkUpdateAsyncStore(updatedTasks);
      })
      .catch(() => {});
  }, [data]);
}
