import * as React from 'react';

import ProgressBar from '@components/ProgressBar/ProgressBar';

const Header = () => {
  return (
    <header className="header">
      <ProgressBar
        steps={[
          { name: 'Диагностика', status: 'complete' },
          { name: 'Георадар', status: 'complete' },
          { name: 'Профилометр', status: 'complete' },
          { name: 'Система позиционирования', status: 'failed' },
          { name: 'Система фото-видео фиксации' }
        ]}
      />
    </header>
  );
};

export default Header;
