import * as actions from './actions';

export function getProjectDetailByIdAction(projectId) {
  return {
    types: [actions.LOAD_PROJECT_DETAIL, actions.LOAD_PROJECT_DETAIL_SUCCESS, actions.LOAD_PROJECT_DETAIL_FAIL],
    promise: (client) => {
      return client.get('/projects/' + projectId);
    }
  };
}

export function getTemplatesAction(projectId) {
  return {
    types: [actions.LOAD_TEMPLATE_LIST, actions.LOAD_TEMPLATE_LIST_SUCCESS, actions.LOAD_TEMPLATE_LIST_FAIL],
    promise: (client) => {
      return client.get(`/projects/${projectId}/templates`)
        .then((templates) => {
          return { projectId, templates };
        });
    }
  };
}

export function insertTemplateAction(projectId, tpl) {
  return {
    types: [actions.INSERT_TEMPLATE, actions.INSERT_TEMPLATE_SUCCESS, actions.INSERT_TEMPLATE_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/templates`;
      return client.post(url, { data: tpl })
        .then((template) => {
          return { projectId, template };
        });
    }
  };
}

export function updateTemplateAction(projectId, tpl) {
  return {
    types: [actions.UPDATE_TEMPLATE, actions.UPDATE_TEMPLATE_SUCCESS, actions.UPDATE_TEMPLATE_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/templates/${tpl.objectId}`;
      return client.put(url, { data: tpl })
        .then((template) => {
          return { projectId, template };
        });
    }
  };
}

export function deleteTemplateAction(projectId, template) {
  return {
    types: [actions.DELETE_TEMPLATE, actions.DELETE_TEMPLATE_SUCCESS, actions.DELETE_TEMPLATE_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/templates/${template.objectId}`;
      return client.del(url)
        .then(() => {
          return { projectId, objectId: template.objectId };
        });
    }
  };
}

export function insertLayoutAction(projectId, newLayout) {
  return {
    types: [actions.INSERT_LAYOUT, actions.INSERT_LAYOUT_SUCCESS, actions.INSERT_LAYOUT_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/layouts`;
      return client.post(url, { data: newLayout })
        .then((layout) => {
          return { projectId, layout };
        });
    }
  };
}

export function updateLayoutAction(projectId, layoutToUpdate) {
  return {
    types: [actions.UPDATE_LAYOUT, actions.UPDATE_LAYOUT_SUCCESS, actions.UPDATE_LAYOUT_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/layouts/${layoutToUpdate.objectId}`;
      return client.put(url, { data: layoutToUpdate })
        .then((layout) => {
          return { projectId, layout };
        });
    }
  };
}

export function deleteLayoutAction(projectId, layout) {
  return {
    types: [actions.DELETE_LAYOUT, actions.DELETE_LAYOUT_SUCCESS, actions.DELETE_LAYOUT_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/layouts/${layout.objectId}`;
      return client.del(url)
        .then(() => {
          return { projectId, objectId: layout.objectId };
        });
    }
  };
}

export function selectPreviewLanguage(languageId) {
  return {
    type: actions.CHANGE_SELECTED_LANGUAGE_ID,
    result: languageId
  };
}

export function selectPreviewLayout(layoutId) {
  return {
    type: actions.CHANGE_SELECTED_LAYOUT_ID,
    result: layoutId
  };
}
