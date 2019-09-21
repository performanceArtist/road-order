import * as React from 'react';

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const mockImport = (path: string) => {
  let Component = () => <></>;

  if (canUseDOM) {
    Component = require(path).default;
  }

  return Component;
};
