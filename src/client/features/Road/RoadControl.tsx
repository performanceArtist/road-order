import * as React from 'react';

import Button from '@components/Button/Button';

const RoadControl = ({ onStart, onStop }) => {
  return (
    <div className="road-control">
      <div className="road-control__button">
        <Button onClick={onStart}>Старт</Button>
      </div>
      <div className="road-control__button">
        <Button onClick={onStop}>Стоп</Button>
      </div>
      <div className="road-control__button">
        <Button>Завершить</Button>
      </div>
      <div className="road-control__button">
        <Button>Отменить</Button>
      </div>
      <div className="road-control__button">
        <Button>Добавить метку</Button>
      </div>
    </div>
  );
};

export default RoadControl;
