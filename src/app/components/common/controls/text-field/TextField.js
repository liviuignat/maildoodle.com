import * as React from 'react';
import ControlBase from './../ControlBase';

export class TextField extends ControlBase {
  constructor(props, context) {
    super(props, context);

    this.defaultClasses = 'mdl-textfield__input';
  }

  getLabelClassName() {
    let css = 'mdl-textfield__label';
    if (this.props.errorText) {
      css += ' is-invalid';
    }
    return css;
  }

  render() {
    return (
      <div className="TextField mdl-textfield mdl-js-textfield mdl-textfield--floating-label">

        <input {...this.props}
          className={ this.getClassName.call(this) } />

        <label className={this.getLabelClassName.call(this)}>{ this.props.labelText }</label>

        <span
          className="mdl-textfield__error"
          style={{
            visibility: this.props.errorText ? 'visible' : 'hidden'
          }}>{ this.props.errorText }</span>
      </div>
    );
  }
}
