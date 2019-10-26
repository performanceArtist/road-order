type Args = {
  reactDom: any;
  bundle: string;
  reduxState?: any;
  helmetData?: any;
  scripts?: string[];
};

const script = (name: string) =>
  `<script type="text/javascript" src="${name}.js"></script>`;

export const renderHTML = ({
  reactDom,
  reduxState,
  helmetData,
  bundle,
  scripts = []
}: Args) => {
  const reduxScript = reduxState
    ? `<script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(reduxState).replace(
    /</g,
    '\\u003c'
  )}
  </script>`
    : '';

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
        ${helmetData.title.toString()}
        ${helmetData.meta.toString()}
      </meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" href="commons.css" />
      <link rel="stylesheet" type="text/css" href="${bundle}.css" />
    </head>
    <body>
      <div class="wrapper">${reactDom}</div>
      ${reduxScript}
      ${[bundle, 'commons', ...scripts].map(script).join('')}
    </body>
  </html>
  `;
};
