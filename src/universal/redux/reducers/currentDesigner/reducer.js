import {fromJS} from 'immutable';
import * as actions from './actions';

const initialState = {
  isLoadingPreview: false,
  preview: {}
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.LOAD_DESIGNER_PREVIEW:
    case actions.LOAD_DESIGNER_PREVIEW_SUCCESS:
    case actions.LOAD_DESIGNER_PREVIEW_FAIL:
      return loadDesignerPreview(state, action);

    default:
      return Object.assign({}, state);
  }
}

function loadDesignerPreview(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.LOAD_DESIGNER_PREVIEW:
      return immutable
        .set('isLoadingPreview', true)
        .toJSON();

    case actions.LOAD_DESIGNER_PREVIEW_SUCCESS:
      return immutable
        .set('isLoadingPreview', false)
        .set('preview', fromJS(action.result))
        .toJSON();

    case actions.LOAD_DESIGNER_PREVIEW_FAIL:
      return immutable
        .set('isLoadingPreview', false)
        .toJSON();

    default:
      return state;
  }
}
