import {fromJS} from 'immutable';
import * as actions from './actions';
import {insertProjectTemplate, updateProjectTemplate, deleteProjectTemplate} from './projectReducer';
import {insertProjectLayout, updateProjectLayout, deleteProjectLayout} from './layoutReducer';

const initialState = {
  loadingProject: false,
  loadProjectError: '',
  insertTemplateError: '',
  updateTemplateError: '',
  deleteTemplateError: '',
  project: null
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.LOAD_PROJECT_DETAIL:
    case actions.LOAD_PROJECT_DETAIL_SUCCESS:
    case actions.LOAD_PROJECT_DETAIL_FAIL:
      return loadProjectDetails(state, action);

    case actions.INSERT_TEMPLATE:
    case actions.INSERT_TEMPLATE_SUCCESS:
    case actions.INSERT_TEMPLATE_FAIL:
      state.project.templates = insertProjectTemplate(state.project.templates, action);
      return Object.assign({}, state);

    case actions.UPDATE_TEMPLATE:
    case actions.UPDATE_TEMPLATE_SUCCESS:
    case actions.UPDATE_TEMPLATE_FAIL:
      state.project.templates = updateProjectTemplate(state.project.templates, action);
      return Object.assign({}, state);

    case actions.DELETE_TEMPLATE:
    case actions.DELETE_TEMPLATE_SUCCESS:
    case actions.DELETE_TEMPLATE_FAIL:
      state.project.templates = deleteProjectTemplate(state.project.templates, action);
      return Object.assign({}, state);

    case actions.INSERT_LAYOUT:
    case actions.INSERT_LAYOUT_SUCCESS:
    case actions.INSERT_LAYOUT_FAIL:
      state.project.layouts = insertProjectLayout(state.project.layouts, action);
      return Object.assign({}, state);

    case actions.UPDATE_LAYOUT:
    case actions.UPDATE_LAYOUT_SUCCESS:
    case actions.UPDATE_LAYOUT_FAIL:
      state.project.layouts = updateProjectLayout(state.project.layouts, action);
      return Object.assign({}, state);

    case actions.DELETE_LAYOUT:
    case actions.DELETE_LAYOUT_SUCCESS:
    case actions.DELETE_LAYOUT_FAIL:
      state.project.layouts = deleteProjectLayout(state.project.layouts, action);
      return Object.assign({}, state);

    default:
      return Object.assign({}, state);
  }
}

function loadProjectDetails(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.LOAD_PROJECT_DETAIL:
      return immutable
        .set('loadingProject', true)
        .set('loadProjectError', '')
        .toJSON();

    case actions.LOAD_PROJECT_DETAIL_SUCCESS:
      return immutable
        .set('loadingProject', false)
        .set('loadProjectError', '')
        .set('project', fromJS(action.result))
        .toJSON();

    case actions.LOAD_PROJECT_DETAIL_FAIL:
      return immutable
        .set('loadingProject', false)
        .set('loadProjectError', fromJS(action.error))
        .toJSON();
    default:
      return state;
  }
}
