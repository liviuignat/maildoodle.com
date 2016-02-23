import * as actions from './actions';
import {fromJS} from 'immutable';

export function insertProjectTemplate(state, action) {
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

export function updateProjectTemplate(state, action) {
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

export function deleteProjectTemplate(state, action) {
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
