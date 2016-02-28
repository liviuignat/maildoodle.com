import React, { Component, PropTypes } from 'react';
import {
  Paper
} from './../../../components';
import {initialize} from 'redux-form';
import { connect } from 'react-redux';
import { updatePersonalInformationAction } from './../../../redux/reducers/auth';
/*
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { pushState } from 'redux-router';
*/
import PersonalInformationForm from './PersonalInformationForm';


@connect(
  state => ({
    user: state.auth.user
  }), {
    initialize,
    updatePersonalInformationAction
  })
export default class MyAccountPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
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

    this.props.initialize('PersonalInformationForm', {firstName, lastName, companyName});
  }

  savePersonalInformation(personalInformation) {
    this.props.updatePersonalInformationAction(personalInformation);
  }

  render() {
    const styles = require('./MyAccountPage.scss');

    return (
      <Paper className={styles.MyAccountPage}>
        <h4>My Account</h4>
        <PersonalInformationForm
          onSubmit={::this.savePersonalInformation}
          />
      </Paper>
    );
  }
}

