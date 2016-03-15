import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {
  Paper
} from 'universal/components';
import {initialize} from 'redux-form';
import { connect } from 'react-redux';
import { updatePersonalInformationAction } from 'universal/redux/reducers/auth';
import PersonalInformationForm, {PERSONAL_INFORMATION_FORM_NAME} from './PersonalInformationForm';

@connect(
  state => ({
    user: state.auth.user,
    isUpdatingUser: state.auth.isUpdatingUser,
  }), {
    initialize,
    updatePersonalInformationAction
  })
export default class MyAccountPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isUpdatingUser: PropTypes.bool.isRequired,
    initialize: PropTypes.func.isRequired,
    updatePersonalInformationAction: PropTypes.func.isRequired
  };

  componentWillMount() {
    const {
      user: {
        firstName,
        lastName,
        companyName
      }
    } = this.props;

    this.props.initialize(PERSONAL_INFORMATION_FORM_NAME, {firstName, lastName, companyName});
  }

  savePersonalInformation(personalInformation) {
    this.props.updatePersonalInformationAction(personalInformation);
  }

  render() {
    const styles = require('./MyAccountPage.scss');
    const {isUpdatingUser} = this.props;

    return (
      <Paper className={styles.MyAccountPage}>
        <Helmet title={`maildoodle - My Account`} />

        <h3>Personal Information</h3>
        <PersonalInformationForm
          isUpdatingUser={isUpdatingUser}
          onSubmit={::this.savePersonalInformation}
          />
      </Paper>
    );
  }
}

