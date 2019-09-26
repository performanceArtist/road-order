import * as React from 'react';

import Spinner from '@elements/Spinner/Spinner';

type Device = {
  name: string;
  status?: 'pending' | 'failed' | 'complete';
};

type Props = {
  devices: Array<Device>;
};

const DeviceTable: React.FC<Props> = ({ devices = [] }) => {
  const checkmark = <span>&#10004;</span>;
  const x = <span>&#10006;</span>;

  const rows = devices.map(({ name, status = 'pending' }) => (
    <div
      className={`device-table__device device-table__device_${status}`}
      key={name}
    >
      <div className="device-table__name">{name}</div>
      {status === 'pending' ? (
        <Spinner />
      ) : (
        <div className="device-table__icon">
          {status === 'complete' ? checkmark : x}
        </div>
      )}
    </div>
  ));

  return <div className="device-table">{rows}</div>;
};

export default DeviceTable;
