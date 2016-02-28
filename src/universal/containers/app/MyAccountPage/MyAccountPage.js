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
    const {user} = this.props;
    if (user.name) {
      this.props.initialize('PersonalInformationForm', {
        firstName: user.name,
        lastName: user.lastName,
        company: user.company
      });
    } else {
      this.props.initialize('PersonalInformationForm', {
        firstName: user.email
      });
    }
  }

  doNothing(personalInformation) {
    let newUserData = Object.assign({}, this.props.user);
    newUserData = Object.assign(newUserData, personalInformation);
    this.props.updatePersonalInformationAction(newUserData);
  }

  render() {
    const styles = require('./MyAccountPage.scss');

    return (
      <Paper className={styles.MyAccountPage}>
        <h4>My Account</h4>
        <PersonalInformationForm
          onSubmit={::this.doNothing}
          />
      </Paper>
    );
  }
}

