import * as React from 'react';
import { useState } from 'react';

import RoadChart from './RoadChart';
import RoadControl from './RoadControl';
import SpeedBar from './SpeedBar';

const Road = () => {
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [interval, setI] = useState(null);

  let counter = 0;

  const startSimulation = () => {
    setI(
      setInterval(() => {
        setSpeed(35 + Math.random() * 5);
        setDistance(counter * 100 + Math.random());
        if (distance > 1200) clearInterval(interval);
        counter += 1;
      }, 300)
    );
  };

  return (
    <div>
      <SpeedBar current={speed} limit={40} />
      <RoadChart min={0} max={1200} current={distance} />
      <RoadControl onStart={startSimulation} />
    </div>
  );
};

export default Road;
