import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { signUpFormValidator } from './signUpFormValidator';
import { FormTextField, RaisedButton } from './../../../components';

@reduxForm({
  form: 'signUp',
  fields: ['email', 'password'],
  validate: signUpFormValidator,
})
export default class SignUpForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSigningUp: PropTypes.bool,
    signUpError: PropTypes.string,
    dirty: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  };

  render() {
    const styles = require('./SignUpPage.scss');
    const {
      fields: {email, password},
      handleSubmit,
      isSigningUp,
      signUpError,
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
              disabled={isSigningUp}/>
          </div>

          <div>
            <FormTextField field={password}
              type="password"
              labelText="Your password"
              fullWidth
              disabled={isSigningUp}/>
          </div>

          <span className={styles.SignUpPageErrorMessage}>{valid && signUpError}</span>

          <div>
            <RaisedButton
              labelText="Create account"
              fullWidth
              primary
              type="submit"
              disabled={isSigningUp}/>
          </div>
        </form>
      </div>
    );
  }
}
