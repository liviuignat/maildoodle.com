import React, {Component, PropTypes} from 'react';
import {reduxForm, stopSubmit} from 'redux-form';
import {FormTextField} from './../../../../components';
import { addTemplateFormValidator } from './addTemplateFormValidator';

export const ADD_TEMPLATE_FORM_NAME = 'addTemplateForm';

@reduxForm({
  form: ADD_TEMPLATE_FORM_NAME,
  fields: ['objectId', 'name', 'description'],
  validate: addTemplateFormValidator,
  stopSubmit
})
export default class AddProjectForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
    submitting: PropTypes.bool,
    saveError: PropTypes.string,
    valid: PropTypes.bool.isRequired
  }

  componentDidUpdate(prevProps) {
    const isNewSubmitRequested = !prevProps.submitting && this.props.submitting;
    if (isNewSubmitRequested) {
      this.submit();
    }
  }

  submit() {
    this.props.handleSubmit();
    this.props.dispatch(stopSubmit(ADD_PROJECT_FORM_NAME));
  }

  render() {
    const {
      fields: {name, description},
      handleSubmit,
      isSaving
    } = this.props;

    return (
      <form
        onSubmit={handleSubmit}>
        <div>
          <FormTextField field={name}
            type="text"
            labelText="Project name"
            fullWidth
            disabled={isSaving}/>
        </div>

        <div>
          <FormTextField field={description}
            type="text"
            labelText="Project description"
            fullWidth
            multiLine
            rows={2}
            disabled={isSaving}/>
        </div>
      </form>
    );
  }
}
