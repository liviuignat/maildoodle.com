import * as React from 'react';
import ComponentBase from './../../../ComponentBase';
import { RaisedButton, TextField, Card } from './../../../common/index';
import { Link } from 'react-router';
import { TextFieldData } from './../../../../utils/FormFieldData/index';
import {
  EmailValidator,
  RequiredStringValidator,
  PasswordValidator,
  formValidator
} from './../../../../utils/Validators/index';

import { createUserAction } from './../../../../actions/index';

interface ICreateUserPageState {
  email: TextFieldData;
  password: TextFieldData;
}

class CreateUserPage extends ComponentBase<any, ICreateUserPageState> {
  static contextTypes: React.ValidationMap<any> = {
    router: React.PropTypes.func.isRequired
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      email: new TextFieldData({
        validators: [ new RequiredStringValidator(), new EmailValidator() ]
      }),
      password: new TextFieldData({
        validators: [ new PasswordValidator() ]
      })
    };
  }

  handleEmailChange(e: any) {
    const value = e.target.value;
    this.setState({
      email: this.state.email.setValue(value)
    });
  }

  handlePasswordChange(e: any) {
    const value = e.target.value;
    this.setState({
      password: this.state.password.setValue(value)
    });
  }

  onFormSubmit(e: any) {
    e.preventDefault();

    const validatorResponse = formValidator.validate(this.state);
    this.setState(validatorResponse.formData);

    if (validatorResponse.isValid) {
      const email = this.state.email.value;
      const password = this.state.password.value;

      createUserAction
        .execute({ email: email, password: password })
        .then(() => {
          this.setState({
            email: this.state.email.reset(),
            password: this.state.password.reset()
          });

          this.props.history.pushState(null, '/app');
        })
        .catch((error) => {
          this.setState({
            password: this.state.password.setError(error.message)
          });
        });
    }
  }

  render() {
    return (
      <div className='CreateUserPage'>
        <div>
          <Card>
            <form noValidate className='CreateUserPage-content' onSubmit={this.onFormSubmit.bind(this)}>
              <span className='CreateUserPage-title'>Sign up</span>

              <div>
                <TextField
                  value={this.state.email.value}
                  errorText={this.state.email.error}
                  onChange={this.handleEmailChange.bind(this)}
                  type='email'
                  hintText='Your email'
                  floatingLabelText='Your email'
                />
              </div>

              <div>
                <TextField
                  value={this.state.password.value}
                  errorText={this.state.password.error}
                  onChange={this.handlePasswordChange.bind(this)}
                  type='password'
                  hintText='Your new password'
                  floatingLabelText='Your new password'
                />
              </div>

              <div className='CreateUserPage-buttonContainer'>
                <RaisedButton
                  primary={true}
                  type='submit'
                  label='Create new account' />
              </div>

              <div>
                  <Link className='CreateUserPage-loginLink' to={`/auth/login`}>Already have an account? Login</Link>
                  <Link className='CreateUserPage-resetPasswordLink' to={`/auth/resetpassword`}>I forgot my password</Link>
                  <div className='clearfix'/>
              </div>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}

export default CreateUserPage;