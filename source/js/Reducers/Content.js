import { INSERT_POST, INSERT_CONTENT, BUMP_PAGE, FETCH_COLLECTION, NO_MORE_CONTENT } from '../Actions/Content';

const defaultState = {
  content: [],
  fetched: [],
  pagination: {}
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default reducer;