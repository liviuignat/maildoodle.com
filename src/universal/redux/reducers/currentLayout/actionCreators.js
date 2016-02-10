import * as actions from './actions';

export function getLayoutDetailsAction(projectId, layoutId) {
  return {
    types: [actions.LOAD_LAYOUT_DETAIL, actions.LOAD_LAYOUT_DETAIL_SUCCESS, actions.LOAD_LAYOUT_DETAIL_FAIL],
    promise: (client) => {
      return client.get(`/projects/${projectId}/layouts/${layoutId}`);
    }
  };
}
