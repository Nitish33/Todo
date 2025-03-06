import {queryClient} from './queryClient';

const invalidateTaskData = () => {
  queryClient.invalidateQueries({
    predicate(query) {
      return query.queryKey[0] === 'todo' || query.queryKey[0] === 'sync_todo';
    },
  });
};

const QueryHelper = {invalidateTaskData};

export default QueryHelper;
