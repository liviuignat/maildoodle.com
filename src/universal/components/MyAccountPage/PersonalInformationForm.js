/* import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { FormTextField, RaisedButton } from './../../../components';

@reduxForm({
  form: 'PersonalInformationForm',
  fields: [
    'firstName',
    'lastName',
    'company',
    'location'],
})
export default class PersonalInformationForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
  }

  render() {
    const styles = require('./MyAccount.scss');
    const {
      fields: {firstName, lastName, company, location}
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <RaisedButton
              labelText="Save"
              fullWidth
              primary
              onClick={handleSubmit}/>
          </div>
        </form>
      </div>
    );
  }
}
*/
