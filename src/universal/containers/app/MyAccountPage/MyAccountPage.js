import React, { Component, PropTypes } from 'react';
import {
  Paper
} from './../../../components';
import {initialize} from 'redux-form';
import { connect } from 'react-redux';
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
    initialize
  })
export default class MyAccountPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {user} = this.props;
    this.props.initialize('PersonalInformationForm', {
      firstName: user.email
    });
  }

  doNothing() {
    console.log('Fuck off');
  }

  render() {
    const styles = require('./MyAccountPage.scss');

    return (
      <Paper className={styles.MyAccountPage}>
        <h4>My Account</h4>
        <PersonalInformationForm
          handleSubmit={::this.doNothing}
          />
      </Paper>
    );
  }
}

