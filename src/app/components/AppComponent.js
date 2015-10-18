import * as React from 'react';
import { RouteHandler } from 'react-router';
import ComponentBase from './ComponentBase';
import Layout from './Layout';
import { AppHeader, AppLeftNav } from './common/index';

class AppComponent extends ComponentBase {

  constructor(props, context) {
    super(props, context);
  }

  handleClick(e) {
    e.preventDefault();

    const leftNav = this.refs['leftNav'];
    leftNav.toggle();
  }

  render() {
    return (
      <Layout>
        <AppHeader onLeftIconButtonTouchTap={this.handleClick.bind(this)} />

        <section className='AppContainer'>
          <RouteHandler {...this.props} />
        </section>
      </Layout>
    );
  }
}

AppComponent.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default AppComponent;
