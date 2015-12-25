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

    case actions.UPDATE_DEVELOPMENT_VERSION:
    case actions.UPDATE_DEVELOPMENT_VERSION_SUCCESS:
    case actions.UPDATE_DEVELOPMENT_VERSION_FAIL:
      state.template.developmentVersion = updateTemplateDevelopmentVersion(state.template.developmentVersion, action);
      return Object.assign({}, state);

    case actions.PROMOTE_PRODUCTION_VERSION:
    case actions.PROMOTE_PRODUCTION_VERSION_SUCCESS:
    case actions.PROMOTE_PRODUCTION_VERSION_FAIL:
      state.template.versions = promoteTemplateProductionVersion(state.template.versions, action);
      return Object.assign({}, state);

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

function updateTemplateDevelopmentVersion(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.UPDATE_DEVELOPMENT_VERSION:
      return Object.assign({}, state);
    case actions.UPDATE_DEVELOPMENT_VERSION_SUCCESS:
      const {html, sampleJson} = action.result.developmentVersion;
      return immutable
        .set('html', html)
        .set('sampleJson', sampleJson)
        .toJSON();
    case actions.UPDATE_DEVELOPMENT_VERSION_FAIL:
      return Object.assign({}, state);
    default:
      return Object.assign({}, state);
  }
}

function promoteTemplateProductionVersion(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.PROMOTE_PRODUCTION_VERSION:
      return immutable.toJSON();
    case actions.PROMOTE_PRODUCTION_VERSION_SUCCESS:
      const version = action.result;
      return immutable
        .push(version)
        .toJSON();
    case actions.PROMOTE_PRODUCTION_VERSION_FAIL:
      return immutable.toJSON();
    default:
      return immutable.toJSON();
  }
}
