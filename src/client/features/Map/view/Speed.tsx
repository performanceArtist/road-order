import * as React from 'react';

type Props = {
  speed: number;
};

const Speed: React.FC<Props> = ({ speed }) => {
  return <h3>Скорость: {speed}</h3>;
};

export default Speed;
