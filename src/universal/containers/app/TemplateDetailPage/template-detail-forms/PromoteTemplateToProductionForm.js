import React, {Component, PropTypes} from 'react';
import {reduxForm, stopSubmit} from 'redux-form';
import {FormTextField} from 'universal/components';
import {promoteTemplateToProductionValidator} from './validators';

export const FORM_NAME = 'promoteTemplateToProductionForm';

@reduxForm({
  form: FORM_NAME,
  fields: ['commitMessage'],
  validate: promoteTemplateToProductionValidator,
  stopSubmit
})
export default class PromoteTemplateToProductionForm extends Component {
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
    this.props.dispatch(stopSubmit(FORM_NAME));
  }

  render() {
    const {
      fields: {commitMessage},
      handleSubmit,
      isSaving
    } = this.props;

    return (
      <form
        onSubmit={handleSubmit}>
        <div>
          <FormTextField field={commitMessage}
            type="text"
            labelText="Commit message"
            fullWidth
            disabled={isSaving}/>
        </div>
      </form>
    );
  }
}
