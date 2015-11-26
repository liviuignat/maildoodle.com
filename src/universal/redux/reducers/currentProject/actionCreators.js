import * as actions from './actions';

export function getProjectDetailByIdAction(projectId) {
  return {
    types: [actions.LOAD_PROJECT_DETAIL, actions.LOAD_PROJECT_DETAIL_SUCCESS, actions.LOAD_PROJECT_DETAIL_FAIL],
    promise: (client) => {
      return client.get('/projects/' + projectId);
    }
  };
}
