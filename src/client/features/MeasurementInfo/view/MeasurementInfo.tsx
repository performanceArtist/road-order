import * as React from 'react';
import { connect } from 'react-redux';

import Chart from '@components/Chart/Chart';
import { RootState } from '@redux/operator/reducer';
import { ServerMeasurement } from '@root/client/shared/types';

type MapState = {
  measurements: ServerMeasurement[];
};

type Props = MapState;

const mapState = (state: RootState): MapState => ({
  ...state.measurements
});

const MeasurementInfo: React.FC<Props> = ({ measurements }) => {
  const density = measurements.map(({ distance, density }) => ({
    distance,
    density
  }));

  const thickness = measurements.map(({ distance, thickness }) => ({
    distance,
    thickness
  }));

  return (
    <div className="measurement-info">
      <Chart
        keyX="distance"
        keyY="density"
        data={density}
        key={density.length}
      />
    </div>
  );
};

export default connect(mapState)(MeasurementInfo);
