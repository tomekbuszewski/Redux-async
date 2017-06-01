import { INSERT_POST } from '../Actions/Content';

const defaultState = {
  content: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case INSERT_POST:
      return [ ...state, action.payload ];
    default:
      return state;
  }
};

export default reducer;