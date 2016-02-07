import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { FormTextField } from './../../../components';

@reduxForm({
  form: 'PersonalInformationForm',
  fields: [
    'firstName',
    'lastName',
    'companyName'],
})
export default class PersonalInformationForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired
  };

  render() {
    // const styles = require('./MyAccount.scss');
    const {
      fields: {
        firstName,
        lastName,
        companyName
      }
    } = this.props;

    const isSaving = false;

    return (
      <div>
        <form>
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
        </form>
      </div>
    );
  }
}
