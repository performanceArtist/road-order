import React from 'react';
import Loadable from 'react-loadable';

import Spinner from '@elements/Spinner/Spinner';

const LoadableRecorder = Loadable({
  loader: () => import('./Recorder'),
  loading() {
    return <Spinner />;
  }
});

export default LoadableRecorder;
