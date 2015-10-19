import * as React from 'react';
import ComponentBase from './../../../ComponentBase';
import { Button, TextField } from './../../../common';
import { Link } from 'react-router';
import { TextFieldData } from './../../../../utils/FormFieldData/index';
import { RequiredStringValidator, EmailValidator, formValidator } from './../../../../utils/Validators/index';

import { resetPasswordAction } from './../../../../actions/index';

class ResetPasswordPage extends ComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      showInfoMessage: false,
      email: new TextFieldData({
        validators: [ new RequiredStringValidator(), new EmailValidator() ]
      })
    };
  }

  onFormSubmit(event) {
    event.preventDefault();

    const validatorResponse = formValidator.validate(this.state);
    this.setState(validatorResponse.formData);

    if (validatorResponse.isValid) {
      resetPasswordAction
        .execute(this.state.email.value)
        .then(() => {
          this.setState({
            showInfoMessage: true,
            email: this.state.email.reset()
          });
        })
        .catch((error) => {
          this.setState({
            email: this.state.email.setError(error.message)
          });
        });
    }
  }

  onEmailChange(event) {
    this.setState({
      showInfoMessage: false,
      email: this.state.email.setValue(event.target.value)
    });
  }

  render() {
    return (
      <div className='PasswordResetPage'>
        <div>
          <form noValidate className='PasswordReset-content' onSubmit={this.onFormSubmit.bind(this)}>
            <span className='PasswordReset-title'>Forgot your password?</span>

             <div>
              <TextField
                onChange={this.onEmailChange.bind(this)}
                value={this.state.email.value}
                errorText={this.state.email.error}
                type='email'
                labelText='Your email' />
             </div>

             <div className='PasswordReset-buttonContainer'>
              <Button
                type='submit'
                value='Request Reset' />

                <span className='PasswordReset-infoMessage'>{ this.state.showInfoMessage ? `We have sent you an email with password reset instructions.` : `` }</span>
             </div>

             <div>
                <Link className='PasswordReset-loginLink' to={`/auth/login`}>Already have an account? Login</Link>
                <div className='clearfix'/>
             </div>
          </form>
      </div>
    </div>
    );
  }
}

export default ResetPasswordPage;
