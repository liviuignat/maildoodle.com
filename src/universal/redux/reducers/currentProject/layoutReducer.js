import * as actions from './actions';
import {fromJS} from 'immutable';

export function insertProjectLayout(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.INSERT_LAYOUT:
      return immutable.toJSON();

    case actions.INSERT_LAYOUT_SUCCESS:
      return immutable.push(fromJS(action.result.layout)).toJSON();

    case actions.INSERT_LAYOUT_FAIL:
      return immutable
        .set('insertLayoutError', fromJS(action.error))
        .toJSON();

    default:
      return state;
  }
}

export function updateProjectLayout(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.UPDATE_LAYOUT:
      return immutable.toJSON();

    case actions.UPDATE_LAYOUT_SUCCESS:
      const layout = action.result.layout;
      const index = immutable
        .findIndex((item) => item.get('objectId') === layout.objectId);

      if (index === -1) {
        return immutable.toJSON();
      }

      return immutable.update(index, () => fromJS(layout)).toJSON();

    case actions.UPDATE_LAYOUT_FAIL:
      return immutable
        .set('insertLayoutError', fromJS(action.error))
        .toJSON();

    default:
      return state;
  }
}

export function deleteProjectLayout(state, action) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.DELETE_LAYOUT:
      return immutable.toJSON();

    case actions.DELETE_LAYOUT_SUCCESS:
      const index = immutable
        .findIndex((item) => item.get('objectId') === action.result.objectId);

      if (index === -1) {
        return immutable.toJSON();
      }

      return immutable.remove(index).toJSON();

    case actions.DELETE_LAYOUT_FAIL:
      return immutable
        .set('insertLayoutError', fromJS(action.error))
        .toJSON();

    default:
      return state;
  }
}
