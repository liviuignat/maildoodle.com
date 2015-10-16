import * as React from 'react';
import config from './../../../app.config';
import ComponentBase from './../../ComponentBase';

class HomePage extends ComponentBase {
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

HomePage.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default HomePage;