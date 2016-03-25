import React, {Component, PropTypes} from 'react';
import {reduxForm, stopSubmit} from 'redux-form';
import {FormTextField} from 'universal/components';
import { addLayoutFormValidator } from './validators';

export const ADD_LAYOUT_FORM_NAME = 'addLayoutForm';

@reduxForm({
  form: ADD_LAYOUT_FORM_NAME,
  fields: ['objectId', 'name'],
  validate: addLayoutFormValidator,
  stopSubmit
})
export default class AddLayoutForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
    submitting: PropTypes.bool,
    saveError: PropTypes.string,
    valid: PropTypes.bool.isRequired
  };

  componentDidUpdate(prevProps) {
    const isNewSubmitRequested = !prevProps.submitting && this.props.submitting;
    if (isNewSubmitRequested) {
      this.submit();
    }
  }

  submit() {
    this.props.handleSubmit();
    this.props.dispatch(stopSubmit(ADD_LAYOUT_FORM_NAME));
  }

  render() {
    const {
      fields: {name},
      handleSubmit,
      isSaving
    } = this.props;

    return (
      <form
        onSubmit={handleSubmit}>
        <div>
          <FormTextField field={name}
            type="text"
            labelText="Layout name"
            fullWidth
            disabled={isSaving}/>
        </div>
      </form>
    );
  }
}
