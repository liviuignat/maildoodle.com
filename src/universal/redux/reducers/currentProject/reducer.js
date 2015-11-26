import * as actions from './actions';
import {fromJS} from 'immutable';

const initialState = {
  loading: false,
  error: '',
  project: null
};

export function reducer(state = initialState, action = {}) {
  const immutable = fromJS(state);

  switch (action.type) {
    case actions.LOAD_PROJECT_DETAIL:
      return immutable
        .set('loading', true)
        .set('error', '')
        .toJSON();

    case actions.LOAD_PROJECT_DETAIL_SUCCESS:
      return immutable
        .set('loading', false)
        .set('error', '')
        .set('project', fromJS(action.result))
        .toJSON();

    case actions.LOAD_PROJECT_DETAIL_FAIL:
      return immutable
        .set('loading', false)
        .set('error', fromJS(action.error))
        .toJSON();

    default:
      return state;
  }
}
