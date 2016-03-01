import React, { Component, PropTypes } from 'react';
import {
  Paper
} from './../../../components';
import {initialize} from 'redux-form';
import { connect } from 'react-redux';
import { updatePersonalInformationAction } from './../../../redux/reducers/auth';
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
        <h4>My Account</h4>
        <PersonalInformationForm
          isUpdatingUser={isUpdatingUser}
          onSubmit={::this.savePersonalInformation}
          />
      </Paper>
    );
  }
}

