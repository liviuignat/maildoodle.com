import React, { Component, PropTypes } from 'react';
import {Dialog, FlatButton} from 'material-ui';

export default class DialogForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    startSubmit: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  show() {
    this.setState({
      open: true
    });
  }

  dismiss() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <Dialog
        ref="formDialog"
        title="Add project"
        open={this.state.open}
        actionFocus="submit"
        autoDetectWindowHeight
        autoScrollBodyContent
        actions={[
          <FlatButton
            key="1"
            label="Cancel"
            secondary
            onClick={::this.dismiss} />,
          <FlatButton
            key="2"
            ref="submit"
            label="Submit"
            primary
            onClick={this.props.startSubmit} />
        ]}>
        {this.props.form}
      </Dialog>
    );
  }
}
