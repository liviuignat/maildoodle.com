import * as React from 'react';
import config from './../../../app.config';
import ComponentBase from './../../ComponentBase';

class HomePage extends ComponentBase {

  static contextTypes: React.ValidationMap = {
    router: React.PropTypes.func.isRequired
  };

  constructor(props) {
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