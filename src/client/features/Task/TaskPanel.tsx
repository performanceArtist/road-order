import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import TaskInfo from './TaskInfo';
import Button from '@components/Button/Button';

import { Task } from '@redux/task/types';
import { RootState } from '@redux/reducer';

type OwnProps = {
  tasks: Array<Task>;
};

type Props = OwnProps;

const TaskPanel: React.FC<Props> = ({ tasks = [] }) => {
  const sortByDate = R.sort(
    ({ date: fdate }, { date: sdate }) =>
      new Date(fdate).getTime() - new Date(sdate).getTime()
  );
  const mapIndexed = R.addIndex(R.map);
  const buttons = (
    <div className="task-panel__buttons">
      <div className="task-panel__button">
        <Button>Проложить маршрут</Button>
      </div>
      <div className="task-panel__button">
        <Button>Отменить заказ</Button>
      </div>
    </div>
  );

  const createElements = mapIndexed((task: any, index: number) => (
    <div
      className={
        index === 0
          ? 'task-panel__task task-panel__task_active'
          : 'task-panel__task'
      }
      key={`task-${task.id}`}
    >
      <TaskInfo task={task} />
      {index === 0 && buttons}
    </div>
  ));

  const transform = R.pipe(
    sortByDate,
    createElements
  );

  return (
    <div className="task-panel">
      {transform(tasks)}
      <div style={{ float: 'left', clear: 'both' }} />
    </div>
  );
};

const mapState = ({ tasks }: RootState) => ({
  tasks: tasks.tasks
});

export default connect(mapState)(TaskPanel);
