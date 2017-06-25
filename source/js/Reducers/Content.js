import { INSERT_POST, INSERT_CONTENT, BUMP_PAGE, FETCH_COLLECTION, NO_MORE_CONTENT, SEARCH } from '../Actions/Content';
import { START_TRANSITION } from '../Actions/Transitions';

const defaultState = {
  content: [],
  fetched: [],
  search: { data: { count: 0 }, query: '' },
  pagination: {}
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_TRANSITION:
      return { ...state, search: { data: { count: 0 }, query: '' } };
    case INSERT_POST:
      return { ...state, content: [ ...state.content, action.payload ], fetched: [ ...state.fetched, action.url ] };
    case INSERT_CONTENT:
      const insertContentState = {...state};
      insertContentState.content[action.payload.id].content = action.payload.data;

      return insertContentState;
    case `${FETCH_COLLECTION}_SUCCESS`:
      return { ...state, fetched: [ ...state.fetched, action.meta.previousAction.payload.request.url ]};
    case BUMP_PAGE:
      return { ...state, pagination: { ...state.pagination, [action.payload]: typeof state.pagination[action.payload] !== 'undefined' ? Number(state.pagination[action.payload]) + 1 : Number('1') }};
    case NO_MORE_CONTENT:
      return { ...state,
        pagination: {
          ...state.pagination,
          [action.payload]: false
        }
      };
    case SEARCH:
      return { ...state, search: { data: { count: 0 }, query: action.payload.request.params.s } };
    case `${SEARCH}_SUCCESS`:
      return { ...state, search: { ...state.search, data: action.payload.data } };
    default:
      return state;
  }
};

export default reducer;