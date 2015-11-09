import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {FormTextField} from './../../../components';

@reduxForm({
  form: 'addProjectForm',
  fields: ['identifier', 'name', 'description']
})
export default class AddProjectForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isInserting: PropTypes.bool,
    submitting: PropTypes.bool,
    insertError: PropTypes.string,
    valid: PropTypes.bool.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const {submitting, valid} = nextProps;

    if (submitting && valid) {
      this.props.handleSubmit();
    }
  }

  render() {
    const {
      fields: {identifier, name, description},
      handleSubmit,
      isInserting,
      insertError,
      valid
    } = this.props;

    return (
      <form
        ref="form"
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

        <span className={''}>{valid && insertError}</span>
      </form>
    );
  }
}
