import * as React from 'react';
import ComponentBase from './../../../ComponentBase';
import { TextFieldData } from './../../../../utils/FormFieldData/index';
import { RequiredStringValidator, formValidator } from './../../../../utils/Validators/index';
import { TextField, RaisedButton } from './../../../common/index';

import { myAccountUpdateAction } from './../../../../actions/index';
import { currentUserStore } from './../../../../stores/index';

class MyAccountPage extends ComponentBase {
  static contextTypes: React.ValidationMap = {
    router: React.PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      displayName: currentUserStore.getDisplayName(),
      firstName: new TextFieldData({
        value: currentUserStore.getUserData().firstName,
        validators: [ new RequiredStringValidator() ]
      }),
      lastName: new TextFieldData({
        value: currentUserStore.getUserData().lastName,
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
    this.setState(this.getInitialState());
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
              hintText='First name'
              floatingLabelText='First name' />
          </div>

          <div>
            <TextField
              value={this.state.lastName.value}
              errorText={this.state.lastName.error}
              onChange={this.handleChange('lastName').bind(this)}
              type='text'
              hintText='Last name'
              floatingLabelText='Last name' />
          </div>

          <div>
            <RaisedButton
              primary={true}
              type='submit'
              label='Save' />
          </div>
        </form>
      </div>
    );
  }
}

export default MyAccountPage;
