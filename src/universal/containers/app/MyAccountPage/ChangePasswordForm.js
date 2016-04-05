import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {FormTextField, RaisedButton} from 'universal/components';
import {changePasswordValidator} from './validators';

export const CHANGE_PASSWORD_FORM_NAME = 'ChangePasswordForm';

@reduxForm({
  form: CHANGE_PASSWORD_FORM_NAME,
  fields: [
    'oldPassword',
    'newPassword',
    'repeatNewPassword'
  ],
  validate: changePasswordValidator
})
export default class ChangePasswordForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isChangingPassword: PropTypes.bool.isRequired,
    changePasswordError: PropTypes.string.isRequired,
    changedPasswordSuccess: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    valid: PropTypes.bool.isRequired
  };

  render() {
    const styles = require('./MyAccountPage.scss');
    const {
      fields: {
        oldPassword,
        newPassword,
        repeatNewPassword
      },
      valid,
      handleSubmit,
      isChangingPassword,
      changePasswordError,
      changedPasswordSuccess
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <FormTextField field={oldPassword}
              type="password"
              labelText="Old password"
              fullWidth
              disabled={isChangingPassword}/>
            <FormTextField field={newPassword}
              type="password"
              labelText="New password"
              fullWidth
              disabled={isChangingPassword}/>
            <FormTextField field={repeatNewPassword}
              type="password"
              labelText="Repeat new password"
              fullWidth
              disabled={isChangingPassword}/>
          </div>

          {valid && <span className={styles.ChangePassword_errorMessage}>{valid && changePasswordError}</span>}
          {valid && changedPasswordSuccess && <span className={styles.ChangePassword_successMessage}>Your password has been changed with success.</span>}

          <div>
            <RaisedButton
              labelText="Change password"
              fullWidth
              primary
              type="submit"
              disabled={isChangingPassword}/>
          </div>
        </form>
      </div>
    );
  }
}
