import React, { Component, PropTypes } from 'react';
import {RaisedButton} from 'material-ui';

export default class FormTextField extends Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired
  };

  render() {
    const {
      labelText
    } = this.props;

    return (
      <RaisedButton
        {...this.props}
        label={labelText} />
    );
  }
}
