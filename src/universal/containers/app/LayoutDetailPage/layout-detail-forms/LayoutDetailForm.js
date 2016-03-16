import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import {layoutDetailFormValidator} from './validators';
import {
  FormTextField,
  RaisedButton,
  CodeEditor
} from 'universal/components';

export const LAYOUT_DETAIL_FORM = 'layoutDetailForm';

@reduxForm({
  form: LAYOUT_DETAIL_FORM,
  fields: ['name', 'value'],
  validate: layoutDetailFormValidator,
})
export default class LayoutDetailForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isUpdatingLayout: PropTypes.bool.isRequired,
    updateLayoutError: PropTypes.string.isRequired,
    dirty: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  };

  render() {
    const styles = require('./LayoutDetailForm.scss');
    const {
      fields: {name, value},
      isUpdatingLayout,
      handleSubmit,
      updateLayoutError,
      valid
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <FormTextField field={name}
              type="text"
              labelText="Layout name"
              fullWidth
              disabled={isUpdatingLayout}/>
          </div>

          <div>
            <CodeEditor
              {...value}
              readOnly={isUpdatingLayout}
              lineNumbers
              matchBrackets
              height={400} />
          </div>

          <span className={styles.LayoutDetailFormErrorMessage}>{valid && updateLayoutError}</span>

          <div>
            <RaisedButton
              labelText="Save"
              fullWidth
              primary
              disabled={isUpdatingLayout}
              type="submit"/>
          </div>
        </form>
      </div>
    );
  }
}
