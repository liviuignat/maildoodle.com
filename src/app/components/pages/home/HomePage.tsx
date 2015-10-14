import * as React from 'react';
import config from './../../../app.config';
import ComponentBase from './../../ComponentBase';

class HomePage extends ComponentBase<any, any> {

  static contextTypes: React.ValidationMap<any> = {
    router: React.PropTypes.func.isRequired
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Welcome to { config.title }</h3>
      </div>
    );
  }
}

export default HomePage;