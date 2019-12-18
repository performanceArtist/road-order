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
import { mapActions } from '@features/Map/redux';

import { taskActions } from '../redux';
const { openModal } = modalActions;

type OwnProps = {
  onlyLastActive?: boolean;
};

type StateProps = {
  tasks: ServerTask[];
};

type Props = OwnProps & StateProps & typeof mapDispatch & RouteComponentProps;

const mapState = ({ tasks }: RootState) => ({
  tasks: tasks.tasks,
});

const mapDispatch = {
  openModal,
  setCurrentTask: taskActions.setCurrentTask,
  setHasArrived: mapActions.setHasArrived
};

const TaskPanel: React.FC<Props> = ({
  tasks = [],
  openModal,
  setCurrentTask,
  setHasArrived,
  history,
  onlyLastActive
}) => {
  const mapIndexed = R.addIndex(R.map);
  const handleStartClick = ({ id }: ServerTask) => {
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

  return (
    <div className="task-panel">
      {createElements(sortByDate(tasks))}
      <div style={{ float: 'left', clear: 'both' }} />
    </div>
  );
};

export default connect(
  mapState,
  mapDispatch
)(withRouter(TaskPanel));
