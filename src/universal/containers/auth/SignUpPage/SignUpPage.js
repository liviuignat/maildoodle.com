import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import { pushState } from 'redux-router';
import { Paper } from './../../../components';
import SignUpForm from './SignUpForm';

@connect(
  state => ({
    user: state.auth.user
  }), {
    initialize,
    pushState
  })
export default class SignUpPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    initialize: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.initialize('signUp', {});
  }

  handleSubmit() {
  }

  render() {
    const styles = require('./SignUpPage.scss');

    return (
      <Paper className={styles.SignUpPage}>
        <h4>Sign Up</h4>
       <SignUpForm
          onSubmit={::this.handleSubmit} />

        <Link className={''} to="/auth/login">Want to login?</Link>
      </Paper>
    );
  }
}
