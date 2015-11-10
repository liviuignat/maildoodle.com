import React, {Component, PropTypes} from 'react';
import {reduxForm, stopSubmit} from 'redux-form';
import {FormTextField} from './../../../components';
import { projectFormValidator } from './projectFormValidator';

export const ADD_PROJECT_FORM_NAME = 'addProjectForm';

@reduxForm({
  form: ADD_PROJECT_FORM_NAME,
  fields: ['objectId', 'identifier', 'name', 'description'],
  validate: projectFormValidator,
  stopSubmit
})
export default class AddProjectForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isInserting: PropTypes.bool,
    submitting: PropTypes.bool,
    insertError: PropTypes.string,
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
      fields: {identifier, name, description},
      handleSubmit,
      isInserting
    } = this.props;

    return (
      <form
        onSubmit={handleSubmit}>
        <div>
          <FormTextField field={identifier}
            type="text"
            labelText="Project identifier"
            fullWidth
            disabled={isInserting}/>
        </div>

        <div>
          <FormTextField field={name}
            type="text"
            labelText="Project name"
            fullWidth
            disabled={isInserting}/>
        </div>

        <div>
          <FormTextField field={description}
            type="text"
            labelText="Project description"
            fullWidth
            multiLine
            rows={2}
            disabled={isInserting}/>
        </div>
      </form>
    );
  }
}
