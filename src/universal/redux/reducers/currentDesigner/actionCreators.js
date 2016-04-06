import * as actions from './actions';

export function getDesignerPreview({component, data}) {
  return {
    types: [
      actions.LOAD_DESIGNER_PREVIEW,
      actions.LOAD_DESIGNER_PREVIEW_SUCCESS,
      actions.LOAD_DESIGNER_PREVIEW_FAIL
    ],
    promise: (client) => {
      const url = `/designer/component/render`;
      return client.post(url, {data: {component, data}});
    }
  };
}
