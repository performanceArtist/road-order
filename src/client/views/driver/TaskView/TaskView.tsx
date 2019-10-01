import * as React from 'react';

import { TaskPanel } from '@root/client/features/TaskPanel';

const TaskView = () => {
  return (
    <div>
      <TaskPanel onlyLastActive filterCancelled />
    </div>
  );
};

export default TaskView;
