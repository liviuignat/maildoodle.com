import * as React from 'react';
import { RouteHandler } from 'react-router';
import ComponentBase from './ComponentBase';
import Layout from './Layout';
import { AppHeader, AppLeftNav } from './common';
import { currentUserStore } from './../stores';
import { CurrentUser } from './../models';

class AppComponent extends ComponentBase {

  constructor(props, context) {
    super(props, context);

    const currentState = {
      user: new CurrentUser(this.props.user),
      isLoggedIn: this.props.isLoggedIn
    };

    this.state = currentState;
  }

  getChildContext() {
    return {
      user: this.state.user,
      isLoggedIn: this.state.isLoggedIn
    };
  }

  componentDidMount() {
    super.componentDidMount();
    currentUserStore.addLoginListener(this.onLogin.bind(this));
    currentUserStore.addLoginListener(this.onLogout.bind(this));
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    currentUserStore.removeChangeListener(this.onLogin.bind(this));
    currentUserStore.removeChangeListener(this.onLogout.bind(this));
  }

  onLogin() {
    const newState = {
      isLoggedIn: currentUserStore.getIsLoggedIn(),
      user: currentUserStore.getUser()
    };
    this.setState(newState);
  }

  onLogout() {
    const newState = {
      isLoggedIn: currentUserStore.getIsLoggedIn(),
      user: currentUserStore.getUser()
    };
    this.setState(newState);
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
          <AppHeader isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>

          <AppLeftNav isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>

          <main className='AppContainer mdl-layout__content'>
            <RouteHandler {...this.props} />
          </main>
        </div>
      </Layout>
    );
  }
}

AppComponent.childContextTypes = {
  user: React.PropTypes.object,
  isLoggedIn: React.PropTypes.bool
};

export default AppComponent;
