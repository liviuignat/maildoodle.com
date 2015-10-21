import * as React from 'react';
import config from './../../../app.config';
import ComponentBase from './../../ComponentBase';
import { Link } from 'react-router';

class AppHeader extends ComponentBase {
  constructor(props, context) {
    super(props, context);
  }

  getHomeLink() {
    return this.props.isLoggedIn ? '/app' : '/';
  }

  render() {
    return (
      <header className="AppHeader mdl-layout__header">
        <div className="mdl-layout__header-row">
          <Link className="AppHeader-homeLink mdl-layout-title" to={ this.getHomeLink.call(this) }>{ config.title }</Link>
          <div className="AppHeader-navigationContainer">
            { this.props.isLoggedIn ? <span /> : this.getNav() }
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
