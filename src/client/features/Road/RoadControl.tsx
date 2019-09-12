import * as React from 'react';

import Button from '@components/Button/Button';

const RoadControl = () => {
  return (
    <div className="road-control">
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
