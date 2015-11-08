import React, { Component, PropTypes } from 'react';
import {TextField} from 'material-ui';

export default class FormTextField extends Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    errorText: PropTypes.string
  };

  render() {
    const {
      labelText,
      field,
      errorText
    } = this.props;

    const errorMessage =
      field.error && field.touched ? field.error : '';

    return (
      <TextField
        {...field}
        {...this.props}
        hintText={labelText}
        floatingLabelText={labelText}
        errorText={errorMessage || errorText} />
    );
  }
}
