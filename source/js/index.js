import React from 'react';
import worker from './registerServiceWorker';
import { render as reactRender } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Routing from './Containers/Routing';

const rootEl = document.getElementById('root');
const render = Component =>
  reactRender(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  );

render(Routing);

if (module.hot) {
  module.hot.accept();
}

worker();