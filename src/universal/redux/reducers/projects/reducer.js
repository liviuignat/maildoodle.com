import * as actions from './actions';

const initialState = {
  loaded: false,
  list: []
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.LOAD_PROJECT_LIST:
      return {
        ...state,
        loading: true
      };
    case actions.LOAD_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.result
      };
    case actions.LOAD_PROJECT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}


