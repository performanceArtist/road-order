import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import TaskInfo from './TaskInfo';

import { Task } from '@redux/task/types';
import { RootState } from '@redux/reducer';

type OwnProps = {
  tasks: Array<Task>;
};

type Props = OwnProps;

const TaskPanel: React.FC<Props> = ({ tasks = [] }) => {
  const elements = tasks.map(task => {
    return (
      <div className="task-panel__task" key={`task-${task.id}`}>
        <TaskInfo task={task} />
      </div>
    );
  });
  const ref = React.createRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [tasks]);

  return (
    <div className="task-panel">
      {elements}
      <div style={{ float: 'left', clear: 'both' }} ref={ref} />
    </div>
  );
};

const mapState = ({ tasks }: RootState) => ({
  tasks: tasks.tasks
});

export default connect(mapState)(TaskPanel);
