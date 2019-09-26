import * as React from 'react';

type Props = {
  limit: number;
  current: number;
};

const SpeedBar: React.FC<Props> = ({ limit, current }) => {
  return (
    <div className="speed-bar">
      <div className="speed-bar__title">
        Скорость
        <br />
        (текущая/лимит):
      </div>
      <div className="speed-bar__circle">{Math.round(current)}</div>
      <div className="speed-bar__circle speed-bar__circle_alert">{limit}</div>
    </div>
  );
};

export default SpeedBar;
