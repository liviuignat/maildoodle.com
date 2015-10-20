import * as React from 'react';
import ComponentBase from './../../../ComponentBase';
import { Button, TextField } from './../../../common';
import { TextFieldData } from './../../../../utils/FormFieldData';
import { RequiredStringValidator, formValidator } from './../../../../utils/Validators';

import { myAccountUpdateAction } from './../../../../actions';
import { currentUserStore } from './../../../../stores';

class MyAccountPage extends ComponentBase {

  constructor(props, context) {
    super(props, context);
    this.state = this.getState();
  }

  getState() {
    return {
      displayName: this.context.user.getDisplayName(),
      firstName: new TextFieldData({
        value: this.context.user.firstName,
        validators: [ new RequiredStringValidator() ]
      }),
      lastName: new TextFieldData({
        value: this.context.user.lastName,
        validators: [ new RequiredStringValidator() ]
      })
    };
  }

  componentDidMount() {
    currentUserStore.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    currentUserStore.removeChangeListener(this.onChange.bind(this));
  }

  onChange() {
    this.reset();
  }

  onFormSubmit(e) {
    e.preventDefault();

    const { formData, isValid } = formValidator.validate(this.state);
    this.setState(formData);

    if (isValid) {
      myAccountUpdateAction
        .execute({
          firstName: this.state.firstName.value,
          lastName: this.state.lastName.value
        })
        .then(() => {
          console.log('done');
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }

  reset() {
    this.setState(this.getState());
  }

  handleChange(field) {
    return (e) => {
      const value = e.target.value;
      const state = this.state;
      const obj = { };

      obj[field] = state[field].setValue(value);
      this.setState(obj);
    };
  }

  render() {
    return (
      <div className='MyAccountPage'>
        <form noValidate onSubmit={this.onFormSubmit.bind(this)}>
          <h2>Hi, {this.state.displayName}</h2>

          <div>
            <TextField
              value={this.state.firstName.value}
              errorText={this.state.firstName.error}
              onChange={this.handleChange('firstName').bind(this)}
              type='text'
              labelText='First name' />
          </div>

          <div>
            <TextField
              value={this.state.lastName.value}
              errorText={this.state.lastName.error}
              onChange={this.handleChange('lastName').bind(this)}
              type='text'
              labelText='Last name' />
          </div>

          <div>
            <Button
              type='submit'
              value='Save' />
          </div>
        </form>
      </div>
    );
  }
}

MyAccountPage.contextTypes = {
  user: React.PropTypes.object,
  isLoggedIn: React.PropTypes.bool
};

export default MyAccountPage;
