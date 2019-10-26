import React from 'react';

type Props = {
  width?: number;
  height?: number;
  color?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
};

const Arrow: React.FC<Props> = ({
  width = 2,
  height = 1.25,
  color = 'black',
  direction = 'left'
}) => (
  <div className={`arrow arrow_${direction}`}>
    <div className="arrow__pointer" />
    <div className="arrow__line" />
  </div>
);

export default Arrow;
