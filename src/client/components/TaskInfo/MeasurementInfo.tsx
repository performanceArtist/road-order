import * as React from 'react';

import { TaskStatus } from '@shared/types';

type Info = {
  title: string;
  value: string | number;
};

type Props = {
  status: TaskStatus;
  kondor: null | string;
  items: Array<Info>;
};

const MeasurementInfo: React.FC<Props> = ({ items, status }) => {
  const info = items.map(({ title, value }) => (
    <div className="measurement-info__item" key={title}>
      <div className="measurement-info__title">{`${title}:`}</div>
      <div className="measurement-info__info">{value}</div>
    </div>
  ));

  return (
    <div className="measurement-info">
      <div className="measurement-info__container">{info}</div>
    </div>
  );
};

export default MeasurementInfo;
