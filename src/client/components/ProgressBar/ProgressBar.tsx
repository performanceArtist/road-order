import * as React from 'react';

type Step = {
  name: string;
  status?: 'pending' | 'failed' | 'complete';
};

type Props = {
  steps: Array<Step>;
};

const ProgressBar: React.FC<Props> = ({ steps = [] }) => {
  const {length} = steps;
  const lines = steps.map(({ name, status }) => (
    <div
      className={`progressbar__step progressbar__step_${status}`}
      style={{ width: `${(1 / length) * 100}%` }}
      key={name}
    />
  ));

  return (
    <div className="progressbar">
      <div className="progressbar__status">
        {steps[length - 1] && steps[length - 1].name}
      </div>
      {lines}
    </div>
  );
};

export default ProgressBar;
