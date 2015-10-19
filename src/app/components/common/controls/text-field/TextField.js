import * as React from 'react';
import ControlBase from './../ControlBase';

export class TextField extends ControlBase {
  constructor(props, context) {
    super(props, context);

    this.defaultClasses = 'mdl-textfield__input';
  }

  render() {
    return (
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input {...this.props} className={ this.getClassName.call(this) } />
        <label className="mdl-textfield__label">{ this.props.labelText }</label>
        <span
          className="mdl-textfield__error"
          style={{
            visibility: this.props.errorText ? 'visible' : 'hidden'
          }}>{ this.props.errorText }</span>
      </div>
    );
  }
}
