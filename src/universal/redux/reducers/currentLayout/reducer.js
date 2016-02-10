import {fromJS} from 'immutable';
import * as actions from './actions';

const initialState = {
  isLoadingLayout: false,
  loadLayoutError: '',
  layout: null
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.LOAD_LAYOUT_DETAIL:
    case actions.LOAD_LAYOUT_DETAIL_SUCCESS:
    case actions.LOAD_LAYOUT_DETAIL_FAIL:
      return loadLayoutDetails(state, action);

    default:
      return Object.assign({}, state);
  }
}

function loadLayoutDetails(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.LOAD_LAYOUT_DETAIL:
      return immutable
        .set('isLoadingLayout', true)
        .set('loadLayoutError', '')
        .toJSON();

    case actions.LOAD_LAYOUT_DETAIL_SUCCESS:
      return immutable
        .set('isLoadingLayout', false)
        .set('loadLayoutError', '')
        .set('layout', fromJS(action.result))
        .toJSON();

    case actions.LOAD_LAYOUT_DETAIL_FAIL:
      return immutable
        .set('isLoadingLayout', false)
        .set('loadLayoutError', fromJS(action.error))
        .toJSON();
    default:
      return state;
  }
}
