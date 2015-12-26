import Colors from 'material-ui/lib/styles/colors';
import React, { Component, PropTypes } from 'react';
import {RaisedButton} from 'material-ui';

export default class FormTextField extends Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    orange: PropTypes.bool
  };

  render() {
    const {
      labelText,
      orange
    } = this.props;

    let backgroundColor = null;
    let labelColor = null;

    if (orange) {
      backgroundColor = Colors.deepOrange900;
      labelColor = Colors.white;
    }

    return (
      <RaisedButton
        {...this.props}
        backgroundColor={backgroundColor}
        labelColor={labelColor}
        label={labelText} />
    );
  }
}
