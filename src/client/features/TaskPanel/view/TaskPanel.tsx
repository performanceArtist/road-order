import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import TaskInfo from '@components/TaskInfo/TaskInfo';
import { Button } from '@shared/view';
import { RootState } from '@root/client/redux/driver/reducer';
import { actions as modalActions } from '@features/Modal/redux';
import { ServerTask } from '@shared/types';
import { setHasArrived } from '@features/Map/redux/actions';

import { creators } from '../redux';
const { setCurrentTask } = creators;
const { openModal } = modalActions;

type OwnProps = {
  onlyLastActive?: boolean;
  filterCancelled?: boolean;
};

type StateProps = {
  tasks: ServerTask[];
  cancel: { cancelled: string[] };
};

type Props = OwnProps & StateProps & typeof mapDispatch & RouteComponentProps;

const mapState = ({ tasks, cancel }: RootState) => ({
  tasks: tasks.tasks,
  cancel
});

const mapDispatch = { openModal, setCurrentTask, setHasArrived };

const TaskPanel: React.FC<Props> = ({
  tasks = [],
  cancel,
  openModal,
  setCurrentTask,
  setHasArrived,
  history,
  filterCancelled,
  onlyLastActive
}) => {
  const mapIndexed = R.addIndex(R.map);
  const handleStartClick = ({ id, route, current_position }: ServerTask) => {
    setHasArrived(false);
    setCurrentTask(id);
    const task = tasks.find(({ id: taskId }) => taskId === id);
    if (!task) return;

    history.push('/map', { route: task.route });
  };

  const buttons = (task: ServerTask) => (
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

  const createElements = mapIndexed((task: any, index: number) => {
    return (
    <div
      className={
        onlyLastActive
          ? index === 0
            ? 'task-panel__task task-panel__task_active'
            : 'task-panel__task'
          : 'task-panel__task task-panel__task_active'
      }
      key={`task-${task.id}`}
    >
      <TaskInfo task={task} />
      {onlyLastActive ? index === 0 && buttons(task) : buttons(task)}
    </div>
  );
  });

  const sortByDate = R.sort(
    ({ date: fdate }, { date: sdate }) =>
      new Date(fdate).getTime() - new Date(sdate).getTime()
  );
  const noCancelled = filterCancelled
    ? R.filter(
      ({ id, status }) => status === 'ready' && !cancel.cancelled.includes(id)
    )(tasks)
    : tasks;
  const activeTasks = sortByDate(noCancelled);

  return (
    <div className="task-panel">
      {activeTasks.map(createElements)}
      <div style={{ float: 'left', clear: 'both' }} />
    </div>
  );
};

export default connect(
  mapState,
  mapDispatch
)(withRouter(TaskPanel));
