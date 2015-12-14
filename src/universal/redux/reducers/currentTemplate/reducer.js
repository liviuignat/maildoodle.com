import * as actions from './actions';
import {fromJS} from 'immutable';

const initialState = {
  loadingTemplate: false,
  loadTemplateError: '',
  template: null
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.LOAD_TEMPLATE_DETAIL:
    case actions.LOAD_TEMPLATE_DETAIL_SUCCESS:
    case actions.LOAD_TEMPLATE_DETAIL_FAIL:
      return loadTemplateDetails(state, action);

    default:
      return Object.assign({}, state);
  }
}

function loadTemplateDetails(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.LOAD_TEMPLATE_DETAIL:
      return immutable
        .set('loadingTemplate', true)
        .set('loadTemplateError', '')
        .toJSON();

    case actions.LOAD_TEMPLATE_DETAIL_SUCCESS:
      return immutable
        .set('loadingTemplate', false)
        .set('loadTemplateError', '')
        .set('template', fromJS(action.result))
        .toJSON();

    case actions.LOAD_TEMPLATE_DETAIL_FAIL:
      return immutable
        .set('loadingTemplate', false)
        .set('loadTemplateError', fromJS(action.error))
        .toJSON();
    default:
      return state;
  }
}
