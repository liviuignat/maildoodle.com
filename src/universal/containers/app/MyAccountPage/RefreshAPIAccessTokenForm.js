import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import {RaisedButton, FormTextField} from './../../../components';

export const REFRESH_API_ACCESS_TOKEN_FORM_NAME = 'RefreshAPIAccessTokenForm';

@reduxForm({
  form: REFRESH_API_ACCESS_TOKEN_FORM_NAME,
  fields: ['apiAccessToken']
})
export default class RefreshAPIAccessTokenForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isRefreshingAPIAccessToken: PropTypes.bool.isRequired
  };

  render() {
    const {
      fields: {
        apiAccessToken,
      },
      handleSubmit,
      isRefreshingAPIAccessToken
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <FormTextField field={apiAccessToken}
              type="text"
              labelText="Api token"
              fullWidth
              readOnly/>
          </div>
          <div>
            <RaisedButton
              labelText="Refresh API access token"
              fullWidth
              primary
              type="submit"
              disabled={isRefreshingAPIAccessToken}/>
          </div>
        </form>
      </div>
    );
  }
}
