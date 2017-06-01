import { combineReducers } from 'redux';

import Transitions from './Transitions'
import Content from './Content';

const reducers = combineReducers({
  Transitions,
  Content
});

export default reducers;