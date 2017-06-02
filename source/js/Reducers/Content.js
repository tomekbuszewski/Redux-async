import { INSERT_POST, INSERT_CONTENT, BUMP_PAGE } from '../Actions/Content';

const defaultState = {
  currentPage: 0,
  nextPage: 1,
  content: [],
  fetched: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case INSERT_POST:
      return { ...state, content: [ ...state.content, action.payload ], fetched: [ ...state.fetched, action.url ] };
    case INSERT_CONTENT:
      const newState = [...state];
      newState[action.payload.id] = action.payload.data;

      return newState;
    case BUMP_PAGE:
      return { ...state, currentPage: state.nextPage, nextPage: ++state.nextPage };
    default:
      return state;
  }
};

export default reducer;