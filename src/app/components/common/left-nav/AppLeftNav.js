import * as React from 'react';
import { Link } from 'react-router';
import ComponentBase from './../../ComponentBase';
import { logoutAction } from './../../../actions/index';

class AppLeftNav extends ComponentBase {
  constructor(props, context) {
    super(props, context);
  }

  logout() {
    logoutAction.execute().then(() => {
      this.context.router.transitionTo('/');
    });
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.getLeftNav();
    } else {
      return (
        <span />
      );
    }
  }

  getLeftNav() {
    return (
      <div className="AppLeftNav mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header className="AppLeftNav-header">
          <img src={ this.props.user.getUserPhoto() } className="AppLeftNav-avatar" />
          <div className="AppLeftNav-dropdown">
            <span>{ this.props.user.getDisplayName() }</span>
            <div className="mdl-layout-spacer"></div>
            <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i className="material-icons" role="presentation">arrow_drop_down</i>
              <span className="visuallyhidden">Accounts</span>
            </button>
            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
              <li className="mdl-menu__item">hello@example.com</li>
              <li className="mdl-menu__item">info@example.com</li>
              <li className="mdl-menu__item"><i className="material-icons">add</i>Add another account...</li>
            </ul>
          </div>
        </header>
        <nav className="AppLeftNav-navigation mdl-navigation mdl-color--blue-grey-800">
          <Link className="AppLeftNav-navigationLink mdl-navigation__link" to="/app">
            <i className="AppLeftNav-navigationIcon material-icons" role="presentation">home</i>Dashboard
          </Link>
          <Link className="AppLeftNav-navigationLink mdl-navigation__link" to="/app/my-account">
            <i className="AppLeftNav-navigationIcon material-icons" role="presentation">inbox</i>My Account
          </Link>
          <Link className="AppLeftNav-navigationLink mdl-navigation__link" to="/app">
            <i className="AppLeftNav-navigationIcon material-icons" role="presentation">delete</i>Trash
          </Link>
          <div className="mdl-layout-spacer"></div>

          <span className="AppLeftNav-logout mdl-navigation__link" onClick={this.logout.bind(this)} >
            <i className="AppLeftNav-navigationIcon material-icons" role="presentation">delete</i>Logout
          </span>
        </nav>
      </div>
    );
  }
}

AppLeftNav.contextTypes = {
  user: React.PropTypes.object,
  isLoggedIn: React.PropTypes.bool,
  router: React.PropTypes.func,
  location: React.PropTypes.object
};

export default AppLeftNav;
