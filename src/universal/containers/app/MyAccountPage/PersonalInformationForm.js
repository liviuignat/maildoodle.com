import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { FormTextField, RaisedButton } from './../../../components';

@reduxForm({
  form: 'PersonalInformationForm',
  fields: [
    'firstName',
    'lastName',
    'companyName',
    'location'],
})
export default class PersonalInformationForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    // const styles = require('./MyAccount.scss');
    const {
      fields: {
        firstName,
        lastName,
        companyName
      },
      handleSubmit
    } = this.props;

    const isSaving = false;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <FormTextField field={firstName}
              type="text"
              labelText="First name"
              fullWidth
              disabled={isSaving}/>
            <FormTextField field={lastName}
              type="text"
              labelText="Last name"
              fullWidth
              disabled={isSaving}/>
            <FormTextField field={companyName}
              type="text"
              labelText="Company name"
              fullWidth
              disabled={isSaving}/>
          </div>
          <div>
            <RaisedButton
              labelText="Update profile"
              fullWidth
              primary
              type="submit"/>
          </div>
        </form>
      </div>
    );
  }
}
