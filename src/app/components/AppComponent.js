import * as React from 'react';
import { RouteHandler } from 'react-router';
import ComponentBase from './ComponentBase';
import Layout from './Layout';
import { AppHeader } from './common/index';

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
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          <AppHeader />

          <section className='AppContainer'>
            <RouteHandler {...this.props} />
          </section>
        </div>
      </Layout>
    );
  }
}

AppComponent.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default AppComponent;
