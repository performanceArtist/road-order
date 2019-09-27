import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import Button from '@elements/Button/Button';
import { RootState } from '@redux/reducer';
import { actions as modalActions } from '@features/Modal/redux';
const { openModal } = modalActions;

import { setCurrentTask } from '../redux/actions';
import { Task } from '../redux/types';
import TaskInfo from './Task';

type OwnProps = {
  tasks: Array<Task>;
  cancel: { cancelled: Array<string> };
};

type Props = OwnProps & typeof mapDispatch;

const mapState = ({ tasks, cancel }: RootState) => ({
  tasks: tasks.tasks,
  cancel
});

const mapDispatch = { openModal, setCurrentTask };

const TaskPanel: React.FC<Props> = ({
  tasks = [],
  cancel,
  openModal,
  setCurrentTask
}) => {
  const sortByDate = R.sort(
    ({ date: fdate }, { date: sdate }) =>
      new Date(fdate).getTime() - new Date(sdate).getTime()
  );
  const mapIndexed = R.addIndex(R.map);
  const handleStartClick = ({ id, from, to, current }) => {
    setCurrentTask(id);
    const href = `/map?from=${JSON.stringify(from)}&to=${JSON.stringify(
      to
    )}&current=${JSON.stringify(current)}`;
    document.location.href = href;
  };

  const buttons = task => (
    <div className="task-panel__buttons">
      <div className="task-panel__button">
        <a onClick={() => handleStartClick(task)}>
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

export default connect(
  mapState,
  mapDispatch
)(TaskPanel);
