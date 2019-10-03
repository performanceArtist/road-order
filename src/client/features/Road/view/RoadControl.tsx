import * as React from 'react';

import { Button } from '@shared/view';

const RoadControl = ({ onStart, onStop, onCancel, onMarkAdd, onEnd }) => {
  return (
    <div className="road-control">
      <div className="road-control__button">
        <Button onClick={onStart}>Старт</Button>
      </div>
      <div className="road-control__button">
        <Button onClick={onStop}>Стоп</Button>
      </div>
      <div className="road-control__button">
        <Button onClick={onEnd}>Завершить</Button>
      </div>
      <div className="road-control__button">
        <Button onClick={onCancel}>Отменить</Button>
      </div>
      <div className="road-control__button">
        <Button onClick={onMarkAdd}>Добавить метку</Button>
      </div>
    </div>
  );
};

export default RoadControl;
