import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import { pushState } from 'redux-router';
import LoginForm from './LoginForm';
import { loginAction } from './../../../redux/reducers/auth';
import { Paper } from './../../../components';

@connect(
  state => ({
    user: state.auth.user,
    loginError: state.auth.loginError,
    loggingIn: state.auth.loggingIn
  }), {
    initialize,
    loginAction,
    pushState
  })
export default class LoginPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    loginError: PropTypes.string,
    loggingIn: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    loginAction: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.initialize('login', {});
  }

  handleSubmit(data) {
    this.props.loginAction(data.email, data.password);
  }

  render() {
    const {loggingIn, loginError} = this.props;
    const styles = require('./LoginPage.scss');

    return (
      <Paper className={styles.LoginPage}>
        <h4>Login</h4>
        <LoginForm
          onSubmit={::this.handleSubmit}
          isLoggingIn={loggingIn || false}
          loginError={loginError}/>
      </Paper>
    );
  }
}
