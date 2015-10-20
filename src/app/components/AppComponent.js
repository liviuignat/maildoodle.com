import * as React from 'react';
import { RouteHandler } from 'react-router';
import ComponentBase from './ComponentBase';
import Layout from './Layout';
import { AppHeader, AppLeftNav } from './common';
import { currentUserStore } from './../stores';

class AppComponent extends ComponentBase {

  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoggedIn: this.props.isLoggedIn || currentUserStore.getIsLoggedIn()
    };
  }

  getChildContext() {
    return {
      isLoggedIn: this.state.isLoggedIn
    };
  }

  componentDidMount() {
    currentUserStore.addLoginListener(this.onLogin.bind(this));
    currentUserStore.addLoginListener(this.onLogout.bind(this));
  }

  componentWillUnmount() {
    currentUserStore.removeChangeListener(this.onLogin.bind(this));
    currentUserStore.removeChangeListener(this.onLogout.bind(this));
  }

  onLogin() {
    this.setState({
      isLoggedIn: currentUserStore.getIsLoggedIn()
    });
  }

  onLogout() {
    this.setState({
      isLoggedIn: currentUserStore.getIsLoggedIn()
    });
  }

  getLayoutClassName() {
    let className = `mdl-layout mdl-js-layout mdl-layout--fixed-header`;

    if (this.state.isLoggedIn) {
      className += ` mdl-layout--fixed-drawer`;
    }

    return className;
  }

  render() {
    return (
      <Layout>
        <div className={ this.getLayoutClassName.call(this) }>
          <AppHeader />

          <AppLeftNav />

          <main className='AppContainer mdl-layout__content'>
            <RouteHandler {...this.props} />
          </main>
        </div>
      </Layout>
    );
  }
}

AppComponent.childContextTypes = {
  isLoggedIn: React.PropTypes.bool
};

export default AppComponent;
