import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton} from 'material-ui';

export default class ConfirmDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isOpen: this.props.isOpen || false
    };
  }

  onConfirm() {
    const {onConfirm} = this.props;
    this.dismiss();
    if (onConfirm) {
      onConfirm();
    }
  }

  onCancel() {
    const {onCancel} = this.props;
    this.dismiss();
    if (onCancel) {
      onCancel();
    }
  }

  show() {
    this.setState({
      isOpen: true
    });
  }

  dismiss() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    const {title, text} = this.props;
    const {isOpen} = this.state;

    return (
      <Dialog
        ref="formDialog"
        title={title || ''}
        open={isOpen}
        autoDetectWindowHeight
        autoScrollBodyContent
        actions={[
          <FlatButton
            key="1"
            ref="cancel"
            label="Cancel"
            secondary
            onClick={::this.onCancel} />,
          <FlatButton
            key="2"
            ref="ok"
            label="Ok"
            primary
            onClick={::this.onConfirm} />
        ]}>
        {text}
      </Dialog>
    );
  }
}
