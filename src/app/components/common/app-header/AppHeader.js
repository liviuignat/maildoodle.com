import * as React from 'react';
import config from './../../../app.config';
import ComponentBase from './../../ComponentBase';
import { Link } from 'react-router';
import { currentUserStore } from './../../../stores';

class AppHeader extends ComponentBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoggedIn: this.context.isLoggedIn
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

  render() {
    return (
      <header className="AppHeader mdl-layout__header">
        <div className="mdl-layout__header-row">
          <Link className="AppHeader-homeLink mdl-layout-title" to="/">{ config.title }</Link>
          <div className="AppHeader-navigationContainer">
            { this.state.isLoggedIn ? <span /> : this.getNav() }
          </div>
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    );
  }

  getNav() {
    return (
      <nav className="mdl-navigation">
        <Link className="AppHeader-navigationLink mdl-navigation__link"
          to="/auth/login">Login</Link>
      </nav>
    );
  }
}

AppHeader.contextTypes = {
  user: React.PropTypes.object,
  isLoggedIn: React.PropTypes.bool
};

export default AppHeader;
