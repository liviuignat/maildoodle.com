import * as React from 'react';
import ComponentBase from './../../ComponentBase';

class ProtectedPageBase extends ComponentBase {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentDidMount();
  }
}

ProtectedPageBase.willTransitionTo = () => {
  //if use is logged in can be checked here
};

export default ProtectedPageBase;
