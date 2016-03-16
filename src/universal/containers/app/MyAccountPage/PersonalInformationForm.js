import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { FormTextField, RaisedButton } from 'universal/components';

export const PERSONAL_INFORMATION_FORM_NAME = 'PersonalInformationForm';

@reduxForm({
  form: PERSONAL_INFORMATION_FORM_NAME,
  fields: [
    'firstName',
    'lastName',
    'companyName',
    'location'],
})
export default class PersonalInformationForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isUpdatingUser: PropTypes.bool.isRequired
  };

  render() {
    const {
      fields: {
        firstName,
        lastName,
        companyName
      },
      handleSubmit,
      isUpdatingUser
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <FormTextField field={firstName}
              type="text"
              labelText="First name"
              fullWidth
              disabled={isUpdatingUser}/>
            <FormTextField field={lastName}
              type="text"
              labelText="Last name"
              fullWidth
              disabled={isUpdatingUser}/>
            <FormTextField field={companyName}
              type="text"
              labelText="Company name"
              fullWidth
              disabled={isUpdatingUser}/>
          </div>
          <div>
            <RaisedButton
              labelText="Update profile"
              fullWidth
              primary
              type="submit"
              disabled={isUpdatingUser}/>
          </div>
        </form>
      </div>
    );
  }
}
