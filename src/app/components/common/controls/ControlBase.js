import * as React from 'react';

export default class ControlBase extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const domNode = React.findDOMNode(this);
    componentHandler.upgradeElement(domNode);
  }

  getClassName() {
    const className = this.props.className || '';
    const defaultClasses = this.defaultClasses || '';

    return `${defaultClasses} ${className}`;
  }
}
