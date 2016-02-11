import * as actions from './actions';

export function getLayoutDetailsAction(projectId, layoutId) {
  return {
    types: [actions.LOAD_LAYOUT_DETAIL, actions.LOAD_LAYOUT_DETAIL_SUCCESS, actions.LOAD_LAYOUT_DETAIL_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/layouts/${layoutId}`;
      return client.get(url);
    }
  };
}

export function updateLayoutDetailsAction(projectId, layoutId, layout) {
  return {
    types: [actions.UPDATE_LAYOUT_DETAIL, actions.UPDATE_LAYOUT_DETAIL_SUCCESS, actions.UPDATE_LAYOUT_DETAIL_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/layouts/${layoutId}`;
      return client.put(url, { data: layout });
    }
  };
}
