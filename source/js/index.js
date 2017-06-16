import React from 'react';
import worker from './registerServiceWorker';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './Utils/store';

import App from './Components/App';

render(<Router><Provider store={store}><App /></Provider></Router>, document.getElementById('root'));
worker();