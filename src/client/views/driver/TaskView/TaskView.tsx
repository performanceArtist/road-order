import * as React from 'react';

import { TaskPanel } from '@root/client/features/TaskPanel';

const TaskView = () => {
  return (
    <div>
      <TaskPanel onlyLastActive />
    </div>
  );
};

export default TaskView;
