import * as React from 'react';

import { Task, getStatus } from '@shared/types';

import MeasurementInfo from './MeasurementInfo';

type OwnProps = {
  task: Task;
};

type Props = OwnProps;

const TaskInfo: React.FC<Props> = ({ task }) => {
  const items = [
    { title: 'Регион', value: task.region },
    { title: 'Город', value: task.city },
    { title: 'Населённый пункт', value: task.settlement },
    { title: 'Дорога', value: task.street },
    { title: 'Участок', value: task.roadPartName },
    { title: 'Кол-во полос', value: task.lanesCount },
    { title: 'Старт', value: task.start },
    { title: 'Финиш', value: task.finish },
    { title: 'Текущая полоса', value: task.lane },
    { title: 'Кондор', value: task.kondor },
    { title: 'Статус', value: getStatus(task.status) }
  ];

  return (
    <div className="task-info">
      <header className="task-info__header">
        <div className="task-info__name">{`#${task.id}`}</div>
      </header>
      <div className="task-info__content">
        <MeasurementInfo
          status={task.status}
          kondor={task.kondor}
          items={items.filter(({ value }) => value)}
        />
      </div>
    </div>
  );
};

export default TaskInfo;
