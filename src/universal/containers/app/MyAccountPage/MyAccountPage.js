import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {
  Paper,
  ConfirmDialog
} from 'universal/components';
import {initialize} from 'redux-form';
import {connect} from 'react-redux';
import {
  updatePersonalInformationAction,
  refreshAPIAccessTokenAction,
  changePasswordAction
} from 'universal/redux/reducers/auth';
import PersonalInformationForm, {PERSONAL_INFORMATION_FORM_NAME} from './PersonalInformationForm';
import RefreshAPIAccessTokenForm, {REFRESH_API_ACCESS_TOKEN_FORM_NAME} from './RefreshAPIAccessTokenForm';
import ChangePasswordForm, {CHANGE_PASSWORD_FORM_NAME} from './ChangePasswordForm';

@connect(
  state => ({
    user: state.auth.user,
    isUpdatingUser: state.auth.isUpdatingUser,
    isRefreshingAPIAccessToken: state.auth.isRefreshingAPIAccessToken,
    isChangingPassword: state.auth.isChangingPassword,
    changePasswordError: state.auth.changePasswordError,
    changedPasswordSuccess: state.auth.changedPasswordSuccess
  }), {
    initialize,
    updatePersonalInformationAction,
    refreshAPIAccessTokenAction,
    changePasswordAction
  })

export default class MyAccountPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isUpdatingUser: PropTypes.bool.isRequired,
    isChangingPassword: PropTypes.bool.isRequired,
    changePasswordError: PropTypes.string.isRequired,
    changedPasswordSuccess: PropTypes.bool.isRequired,
    isRefreshingAPIAccessToken: PropTypes.bool.isRequired,
    initialize: PropTypes.func.isRequired,
    updatePersonalInformationAction: PropTypes.func.isRequired,
    refreshAPIAccessTokenAction: PropTypes.func.isRequired,
    changePasswordAction: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const {
      user: {
        firstName,
        lastName,
        companyName,
        apiAccessToken
      }
    } = this.props;

    this.props.initialize(PERSONAL_INFORMATION_FORM_NAME, {firstName, lastName, companyName});
    this.props.initialize(REFRESH_API_ACCESS_TOKEN_FORM_NAME, {apiAccessToken});
    this.props.initialize(CHANGE_PASSWORD_FORM_NAME, {});
  }

  componentWillReceiveProps(nextProps) {
    const {
      user: {
        firstName,
        lastName,
        companyName,
        apiAccessToken
      }
    } = nextProps;

    this.props.initialize(PERSONAL_INFORMATION_FORM_NAME, {firstName, lastName, companyName});
    this.props.initialize(REFRESH_API_ACCESS_TOKEN_FORM_NAME, {apiAccessToken});
  }

  onRefreshConfirm() {
    this.props.refreshAPIAccessTokenAction();
  }

  savePersonalInformation(personalInformation) {
    this.props.updatePersonalInformationAction(personalInformation);
  }

  refreshAPIAccessToken() {
    this.refs.refreshConfirmDialog.show();
  }

  changePassword(passwordInformation) {
    const {user: {email}} = this.props;
    const {oldPassword, newPassword} = passwordInformation;
    this.props.changePasswordAction({email, oldPassword, newPassword});
  }

  render() {
    const styles = require('./MyAccountPage.scss');
    const {
      isUpdatingUser,
      isRefreshingAPIAccessToken,
      isChangingPassword,
      changePasswordError,
      changedPasswordSuccess
    } = this.props;

    return (
      <div className={styles.MyAccountPage}>
        <Helmet title={`maildoodle - My Account`} />
        <ConfirmDialog
          ref="refreshConfirmDialog"
          title="Refresh token?"
          text="Are you sure you want to refresh your API token? Your old token will not work anymore."
          onConfirm={::this.onRefreshConfirm}/>

        <Paper className={styles.PersonalInformation_section}>
          <h3>Personal Information</h3>
          <PersonalInformationForm
            isUpdatingUser={isUpdatingUser}
            onSubmit={::this.savePersonalInformation}
            />
        </Paper>

        <Paper className={styles.ChangePassword_section}>
          <h3>Change password</h3>
          <ChangePasswordForm
            isChangingPassword={isChangingPassword}
            changePasswordError={changePasswordError}
            changedPasswordSuccess={changedPasswordSuccess}
            onSubmit={::this.changePassword}
            />
        </Paper>

        <Paper className={styles.RefreshApiToken_section}>
          <h3>Refresh API access token</h3>
          <RefreshAPIAccessTokenForm
            isRefreshingAPIAccessToken={isRefreshingAPIAccessToken}
            onSubmit={::this.refreshAPIAccessToken}
            />
        </Paper>
      </div>
    );
  }
}
