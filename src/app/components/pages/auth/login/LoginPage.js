import * as React from 'react';
import ComponentBase from './../../../ComponentBase';
import { Link } from 'react-router';
import { Button, TextField } from './../../../common';
import { TextFieldData } from './../../../../utils/FormFieldData';
import { RequiredStringValidator, EmailValidator, formValidator } from './../../../../utils/Validators';

import { loginAction } from './../../../../actions/index';

class LoginPage extends ComponentBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: new TextFieldData({
        validators: [ new RequiredStringValidator(), new EmailValidator() ]
      }),
      password: new TextFieldData({
        validators: [ new RequiredStringValidator() ]
      })
    };
  }

  onFormSubmit(e) {
    const user = this.state;
    const validatorResponse = formValidator.validate(user);
    const { formData, isValid } = validatorResponse;

    this.setState(formData);

    if (isValid) {
      loginAction
        .execute({
          email: user.email.value,
          password: user.password.value
        })
        .then(() => {
          this.setState({
            password: this.state.password.reset(),
            email: this.state.email.reset()
          });
          this.context.router.transitionTo('/app');
        })
        .catch((error) => {
          this.setState({
            password: this.state.password.setError(error.message)
          });
        });
    }

    e.preventDefault();
  }

  handleEmailChange(e) {
    const value = e.target.value;
    this.setState({
      email: this.state.email.setValue(value)
    });
  }

  handlePasswordChange(e) {
    const value = e.target.value;
    this.setState({
      password: this.state.password.setValue(value)
    });
  }

  render() {
    return (
      <div className='LoginPage'>
        <div>
            <form noValidate className='LoginPage-content' onSubmit={this.onFormSubmit.bind(this)}>
              <span className='LoginPage-title'>Login</span>

              <div>
                <TextField
                  value={this.state.email.value}
                  errorText={this.state.email.error}
                  onChange={this.handleEmailChange.bind(this)}
                  type='email'
                  labelText='Your email' />
              </div>

              <div>
                <TextField
                  value={this.state.password.value}
                  errorText={this.state.password.error}
                  onChange={this.handlePasswordChange.bind(this)}
                  type='password'
                  labelText='Your password' />
              </div>

              <div className='LoginPage-loginButtonContainer'>
                <Button type="submit"
                  value="Login" />
              </div>

              <div>
                <Link className='LoginPage-signUpLink' to={`/auth/signup`}>Create a new account</Link>
                <Link className='LoginPage-resetPasswordLink' to={`/auth/resetpassword`}>I forgot my password</Link>
                <div className='clearfix'/>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.func,
  location: React.PropTypes.object
};

export default LoginPage;
