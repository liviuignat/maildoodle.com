import * as actions from './actions';
import {fromJS} from 'immutable';

const initialState = {
  loaded: false,
  list: []
};

export function reducer(state = initialState, action = {}) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.LOAD_PROJECT_LIST:
      return immutable
        .set('loading', true)
        .toJSON();

    case actions.LOAD_PROJECT_LIST_SUCCESS:
      return immutable
        .set('loading', false)
        .set('loaded', true)
        .set('list', fromJS(action.result))
        .toJSON();

    case actions.LOAD_PROJECT_LIST_FAIL:
      return immutable
        .set('loading', false)
        .set('loaded', true)
        .set('error', fromJS(action.error))
        .toJSON();

    case actions.INSERT_PROJECT:
      return immutable
        .set('isInserting', true)
        .toJSON();

    case actions.INSERT_PROJECT_SUCCESS:
      const addedList = immutable.get('list')
        .push(fromJS(action.result));

      return immutable
        .set('isInserting', false)
        .set('loaded', true)
        .set('list', addedList)
        .toJSON();

    case actions.INSERT_PROJECT_FAIL:
      return immutable
        .set('isInserting', false)
        .set('insertError', fromJS(action.error))
        .toJSON();

    case actions.UPDATE_PROJECT:
      return immutable
        .set('isUpdating', true)
        .toJSON();

    case actions.UPDATE_PROJECT_SUCCESS:
      let updatedList = immutable.get('list');
      const updateIndex = updatedList.findIndex((item) => item.get('objectId') === action.result.objectId);

      if (updateIndex === -1) {
        return immutable.toJSON();
      }

      updatedList = immutable.get('list')
        .update(updateIndex, () => fromJS(action.result));

      return immutable
        .set('isUpdating', false)
        .set('loaded', true)
        .set('list', updatedList)
        .toJSON();

    case actions.UPDATE_PROJECT_FAIL:
      return immutable
        .set('isUpdating', false)
        .set('updateError', fromJS(action.error))
        .toJSON();

    case actions.DELETE_PROJECT:
      return immutable
        .set('isDeleting', true)
        .toJSON();

    case actions.DELETE_PROJECT_SUCCESS:
      let deleteList = immutable.get('list');
      const deleteIndex = deleteList.findIndex((item) => item.get('objectId') === action.result.objectId);

      if (deleteIndex === -1) {
        return immutable.toJSON();
      }

      deleteList = immutable.get('list')
        .remove(deleteIndex);

      return immutable
        .set('isDeleting', false)
        .set('loaded', true)
        .set('list', deleteList)
        .toJSON();

    case actions.DELETE_PROJECT_FAIL:
      return immutable
        .set('isDeleting', false)
        .set('deleteError', fromJS(action.error))
        .toJSON();

    default:
      return state;
  }
}
