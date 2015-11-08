import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { loginFormValidator } from './loginFormValidator';
import { FormTextField, RaisedButton } from './../../../components';

@reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: loginFormValidator,
})
export default class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isLoggingIn: PropTypes.bool,
    loginError: PropTypes.string,
    dirty: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const styles = require('./LoginPage.scss');
    const {
      fields: {email, password},
      isLoggingIn,
      handleSubmit,
      loginError,
      valid
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <FormTextField field={email}
              type="email"
              labelText="Your email"
              fullWidth
              disabled={isLoggingIn}/>
          </div>

          <div>
            <FormTextField field={password}
              type="password"
              labelText="Your password"
              fullWidth
              disabled={isLoggingIn}/>
          </div>

          <span className={styles.LoginPageErrorMessage}>{valid && loginError}</span>

          <div>
            <RaisedButton
              labelText="Login"
              fullWidth
              primary
              disabled={isLoggingIn}
              onClick={handleSubmit}/>
          </div>
        </form>
      </div>
    );
  }
}
