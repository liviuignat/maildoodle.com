import * as React from 'react';

export default class ControlBase extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getClassName() {
    const className = this.props.className || '';
    const defaultClasses = this.defaultClasses || '';

    return `${defaultClasses} ${className}`;
  }
}
