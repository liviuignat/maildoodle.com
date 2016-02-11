import {fromJS} from 'immutable';
import * as actions from './actions';

const initialState = {
  isLoadingLayout: false,
  loadLayoutError: '',

  isUpdatingLayout: false,
  updateLayoutError: '',

  layout: null
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.LOAD_LAYOUT_DETAIL:
    case actions.LOAD_LAYOUT_DETAIL_SUCCESS:
    case actions.LOAD_LAYOUT_DETAIL_FAIL:
      return loadLayoutDetails(state, action);

    case actions.UPDATE_LAYOUT_DETAIL:
    case actions.UPDATE_LAYOUT_DETAIL_SUCCESS:
    case actions.UPDATE_LAYOUT_DETAIL_FAIL:
      return updateLayoutDetails(state, action);

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

function updateLayoutDetails(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.UPDATE_LAYOUT_DETAIL:
      return immutable
        .set('isUpdatingLayout', true)
        .set('updateLayoutError', '')
        .toJSON();

    case actions.UPDATE_LAYOUT_DETAIL_SUCCESS:
      return immutable
        .set('isUpdatingLayout', false)
        .set('updateLayoutError', '')
        .set('layout', fromJS(action.result))
        .toJSON();

    case actions.UPDATE_LAYOUT_DETAIL_FAIL:
      return immutable
        .set('isUpdatingLayout', false)
        .set('updateLayoutError', fromJS(action.error))
        .toJSON();

    default:
      return state;
  }
}
