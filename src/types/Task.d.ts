type TaskType = {
  id: number;
  title: string;
  completed: boolean;
  isSynced: boolean;

  remoteId?: number; // If a task is synced with server we will have remote Id.
  status?: 'added' | 'updated' | 'deleted';
};
