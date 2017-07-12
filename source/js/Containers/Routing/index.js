import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../Components/App';

import store from '../../Utils/store';

const Routing = () => <Router><Provider store={store}><App /></Provider></Router>;

export default Routing;