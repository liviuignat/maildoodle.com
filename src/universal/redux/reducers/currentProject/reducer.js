import * as actions from './actions';
import {fromJS} from 'immutable';

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
      return state;

    case actions.UPDATE_TEMPLATE:
    case actions.UPDATE_TEMPLATE_SUCCESS:
    case actions.UPDATE_TEMPLATE_FAIL:
      state.project.templates = updateProjectTemplate(state.project.templates, action);
      return state;

    case actions.DELETE_TEMPLATE:
    case actions.DELETE_TEMPLATE_SUCCESS:
    case actions.DELETE_TEMPLATE_FAIL:
      state.project.templates = deleteProjectTemplate(state.project.templates, action);
      return state;

    default:
      return state;
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

function insertProjectTemplate(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.INSERT_TEMPLATE:
      return immutable.toJSON();

    case actions.INSERT_TEMPLATE_SUCCESS:
      return immutable.push(fromJS(action.result.template)).toJSON();

    case actions.INSERT_TEMPLATE_FAIL:
      return immutable
        .set('insertTemplateError', fromJS(action.error))
        .toJSON();

    default:
      return state;
  }
}

function updateProjectTemplate(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.UPDATE_TEMPLATE:
      return immutable.toJSON();

    case actions.UPDATE_TEMPLATE_SUCCESS:
      const template = action.result.template;
      const index = immutable
        .findIndex((item) => item.get('objectId') === template.objectId);

      if (index === -1) {
        return immutable.toJSON();
      }

      return immutable.update(index, () => fromJS(template)).toJSON();

    case actions.UPDATE_TEMPLATE_FAIL:
      return immutable
        .set('insertTemplateError', fromJS(action.error))
        .toJSON();

    default:
      return state;
  }
}

function deleteProjectTemplate(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.DELETE_TEMPLATE:
      return immutable.toJSON();

    case actions.DELETE_TEMPLATE_SUCCESS:
      const index = immutable
        .findIndex((item) => item.get('objectId') === action.result.objectId);

      if (index === -1) {
        return immutable.toJSON();
      }

      return immutable.remove(index).toJSON();

    case actions.DELETE_TEMPLATE_FAIL:
      return immutable
        .set('insertTemplateError', fromJS(action.error))
        .toJSON();

    default:
      return state;
  }
}
