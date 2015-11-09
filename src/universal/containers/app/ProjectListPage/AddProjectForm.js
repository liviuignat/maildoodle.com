import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {FormTextField} from './../../../components';

@reduxForm({
  form: 'addProject',
  fields: ['identifier', 'name', 'description']
})
export default class AddProjectForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isInserting: PropTypes.bool,
    insertError: PropTypes.string,
    valid: PropTypes.bool.isRequired
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
      <div>
        <form onSubmit={handleSubmit}>
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
      </div>
    );
  }
}
