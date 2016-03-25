import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {
  Paper
} from 'universal/components';
import {initialize} from 'redux-form';
import {connect} from 'react-redux';
import {updatePersonalInformationAction, refreshAPIAccessTokenAction} from 'universal/redux/reducers/auth';
import PersonalInformationForm, {PERSONAL_INFORMATION_FORM_NAME} from './PersonalInformationForm';
import RefreshAPIAccessTokenForm, {REFRESH_API_ACCESS_TOKEN_FORM_NAME} from './RefreshAPIAccessTokenForm';

@connect(
  state => ({
    user: state.auth.user,
    isUpdatingUser: state.auth.isUpdatingUser,
    isRefreshingAPIAccessToken: state.auth.isRefreshingAPIAccessToken
  }), {
    initialize,
    updatePersonalInformationAction,
    refreshAPIAccessTokenAction
  })

export default class MyAccountPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isUpdatingUser: PropTypes.bool.isRequired,
    isRefreshingAPIAccessToken: PropTypes.bool.isRequired,
    initialize: PropTypes.func.isRequired,
    updatePersonalInformationAction: PropTypes.func.isRequired,
    refreshAPIAccessTokenAction: PropTypes.func.isRequired
  };

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
  }

  savePersonalInformation(personalInformation) {
    this.props.updatePersonalInformationAction(personalInformation);
  }

  refreshAPIAccessToken() {
    console.log('bla');
  }

  render() {
    const styles = require('./MyAccountPage.scss');
    const {isUpdatingUser, isRefreshingAPIAccessToken} = this.props;

    return (
      <div className={styles.MyAccountPage}>
        <Helmet title={`maildoodle - My Account`} />

        <Paper className={styles.PersonalInformationSection}>
          <h3>Personal Information</h3>
          <PersonalInformationForm
            isUpdatingUser={isUpdatingUser}
            onSubmit={::this.savePersonalInformation}
            />
        </Paper>

        <Paper className={styles.RefreshApiTokenSection}>
          <h3>Refresh API access token</h3>
          <RefreshAPIAccessTokenForm
            isUpdatingUser={isRefreshingAPIAccessToken}
            onSubmit={::this.refreshAPIAccessToken}
            />
        </Paper>
      </div>
    );
  }
}
