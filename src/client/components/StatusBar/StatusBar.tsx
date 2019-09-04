import * as React from 'react';

import ProgressBar from '@components/ProgressBar/ProgressBar';

const StatusBar = () => {
  return (
    <div>
      <ProgressBar
        steps={[
          { name: 'Диагностика', status: 'complete' },
          { name: 'Георадар', status: 'complete' },
          { name: 'Профилометр', status: 'complete' },
          { name: 'Система позиционирования', status: 'failed' },
          { name: 'Система фото-видео фиксации' }
        ]}
      />
    </div>
  );
};

export default StatusBar;
