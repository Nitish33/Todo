### Install instruction.

1. Clone the repo
2. use `npm i` to install dependency
3. Run using `npm start` command


### Data type
```
type TaskType = {
  id: number;           ----> Local id given to new task
  title: string;        ----> Store todo text
  completed: boolean;   ----> Task is completed or not
  isSynced: boolean;    ----> will be true when data is synced with server

  remoteId?: number;    ----> If a task is synced with server we will have remote Id. 

  <!-- It will store the last update state of the data -->
  status?: 'added' | 'updated' | 'deleted';
};

```

### Flow to add new todo
1. When user add a new task, I are updating our async store `useAddNewTodo`
2. Once the mutation is complete, I are also invalidate sync query `useSyncMutation`
3. `useSyncMutation` fetch all the data from async store, loop over the list and filter all the tasks which are not synced.
4. For every `unsynced` item, I are making a post request `useAddNewTodoRemote` in parallel. 
5. After all request are fulfilled, I am iterating over response and for every successful request, updating the `Task` and finally saving the updated `Task` in the store. 


> I am first storing the data in local and then trying to upload to remote in the sync cycle instead of first trying for online and if it fail, storing it in the local store. This is done to remove duplicate logic from 2 places and simplify the flow.


### Why I am not using TanStack in-build offline persistence  
1. In-build persistence is helpful when storing small amount to data in Async store but for Offline first app, we might want to use more complex database like watermalonDB, sqlite or room db.
2. In-build solution do not normalize the data, making it memory inefficient.
3. Dependent mutation is hard. Suppose we have two mutation
   
   Record 1    -> mutation 1 -> Record 1'

   Record 1'   -> mutation 2 -> Record 1''

   Now while syncing, We don't want to try mutation 2 without the successful completion of mutation 1


