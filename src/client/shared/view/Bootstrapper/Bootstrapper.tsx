import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '@redux/io/socket';
import { getTasks } from '@features/TaskPanel/redux/actions';

const mapDispatch = { startChannel: socket.startChannel, getTasks };

const StartChannel: React.FC<typeof mapDispatch> = ({
  startChannel,
  getTasks
}) => {
  useEffect(() => {
    startChannel();
    getTasks();
  }, []);

  return null;
};

export default connect(
  null,
  mapDispatch
)(StartChannel);
