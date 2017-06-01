import { START_TRANSITION, END_TRANSITION, TOGGLE_TRANSITION } from '../Actions/Transitions';

const defaultState = {
  loaded: true
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_TRANSITION:
      return { ...state, loaded: false };
    case END_TRANSITION:
      return { ...state, loaded: true };
    case TOGGLE_TRANSITION:
      return { ...state, loaded: !state.loaded };
    default:
      return state;
  }
};

export default reducer;