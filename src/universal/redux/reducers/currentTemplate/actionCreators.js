import * as actions from './actions';

export function getTemplateDetailByIdAction(projectId, templateId) {
  return {
    types: [actions.LOAD_TEMPLATE_DETAIL, actions.LOAD_TEMPLATE_DETAIL_SUCCESS, actions.LOAD_TEMPLATE_DETAIL_FAIL],
    promise: (client) => {
      const url = `/projects/${projectId}/templates/${templateId}`;
      return client.get(url);
    }
  };
}
