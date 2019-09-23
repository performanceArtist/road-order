import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import TaskInfo from './TaskInfo';
import Button from '@components/Button/Button';

import { Task } from '@redux/task/types';
import { RootState } from '@redux/reducer';
import { openModal } from '@redux/modal/actions';

type OwnProps = {
  tasks: Array<Task>;
  cancel: { cancelled: Array<string> };
};

type Props = OwnProps;

const TaskPanel: React.FC<Props> = ({ tasks = [], cancel, openModal }) => {
  const sortByDate = R.sort(
    ({ date: fdate }, { date: sdate }) =>
      new Date(fdate).getTime() - new Date(sdate).getTime()
  );
  const mapIndexed = R.addIndex(R.map);
  const buttons = task => (
    <div className="task-panel__buttons">
      <div className="task-panel__button">
        <a
          href={`/map?from=${JSON.stringify(task.from)}&to=${JSON.stringify(
            task.to
          )}&current=${JSON.stringify(task.current)}`}
        >
          <Button>Проложить маршрут</Button>
        </a>
      </div>
      <div className="task-panel__button">
        <Button onClick={() => openModal('Cancel', { taskId: task.id })}>
          Отменить задание
        </Button>
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
      {index === 0 && buttons(task)}
    </div>
  ));

  const filterCanceled = R.filter(({ id }) => !cancel.cancelled.includes(id));

  const transform = R.pipe(
    filterCanceled,
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

const mapState = ({ tasks, cancel }: RootState) => ({
  tasks: tasks.tasks,
  cancel
});

const mapDispatch = { openModal };

export default connect(
  mapState,
  mapDispatch
)(TaskPanel);
