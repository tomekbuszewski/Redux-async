import { START_TRANSITION, END_TRANSITION } from '../Actions/Transitions';

const defaultState = {
    loaded: true
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case START_TRANSITION:
            return { ...state, loaded: true };
        case END_TRANSITION:
            return { ...state, loaded: false };
        default:
            return state;
    }
};

export default reducer;