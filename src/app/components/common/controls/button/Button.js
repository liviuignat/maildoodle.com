import * as React from 'react';
import ControlBase from './../ControlBase';

export class Button extends ControlBase {
  constructor(props, context) {
    super(props, context);

    this.defaultClasses = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored';
  }

  render() {
    return (
      <button
        { ...this.props }
        className={ this.getClassName.call(this) }>
        {this.props.value}
      </button>
    );
  }
}
