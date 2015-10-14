import * as React from 'react';

class ComponentBase<P, S> extends React.Component<P, S> {
  setState(state: any, callback?: any): void {
    super.setState(state, callback);
  };
}

export default ComponentBase;