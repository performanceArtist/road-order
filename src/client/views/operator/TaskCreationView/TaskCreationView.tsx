import React from 'react';

import { canUseDOM } from '@shared/utils';

let OperatorTaskCreator = () => <></>;
if (canUseDOM) {
  OperatorTaskCreator = require('@features/OperatorTaskCreator/view/OperatorTaskCreator')
    .default;
}

const TaskCreationView = () => {
  return (
    <div>
      <OperatorTaskCreator />
    </div>
  );
};

export default TaskCreationView;
