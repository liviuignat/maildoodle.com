import * as actions from './actions';

export function getProjectsAction() {
  return {
    types: [actions.LOAD_PROJECT_LIST, actions.LOAD_PROJECT_LIST_SUCCESS, actions.LOAD_PROJECT_LIST_FAIL],
    promise: (client) => {
      return client.get('/projects');
    }
  };
}

export function insertProjectAction(project) {
  return {
    types: [actions.INSERT_PROJECT, actions.INSERT_PROJECT_SUCCESS, actions.INSERT_PROJECT_FAIL],
    promise: (client) => {
      return client.post('/projects', {
        data: project
      });
    }
  };
}

export function updateProjectAction(project) {
  return {
    types: [actions.UPDATE_PROJECT, actions.UPDATE_PROJECT_SUCCESS, actions.UPDATE_PROJECT_FAIL],
    promise: (client) => {
      return client.put('/projects/' + project.objectId, {
        data: project
      });
    }
  };
}

export function deleteProjectAction(project) {
  return {
    types: [actions.DELETE_PROJECT, actions.DELETE_PROJECT_SUCCESS, actions.DELETE_PROJECT_FAIL],
    promise: (client) => {
      return client.del('/projects/' + project.objectId)
        .then(() => {
          return {
            objectId: project.objectId
          };
        });
    }
  };
}
