import * as React from 'react';
import { Link } from 'react-router';
import ComponentBase from './../../ComponentBase';
import { logoutAction } from './../../../actions/index';

class AppLeftNav extends ComponentBase {
  constructor(props, context) {
    super(props, context);
  }

  logout() {
    logoutAction.execute();
  }

  render() {
    if (this.context.isLoggedIn) {
      return this.renderLoggedIn();
    } else {
      return (
        <span />
      );
    }
  }

  renderLoggedIn() {
    return (
      <div className="mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header className="demo-drawer-header">
          <img src="images/user.jpg" className="demo-avatar" />
          <div className="demo-avatar-dropdown">
            <span>hello@example.com</span>
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
        <nav className="mdl-navigation mdl-color--blue-grey-800">
          <Link className="mdl-navigation__link" to="/"><i className="mdl-color-text--blue-grey-100 material-icons" role="presentation">home</i>Home</Link>
          <Link className="mdl-navigation__link" to="/"><i className="mdl-color-text--blue-grey-100 material-icons" role="presentation">inbox</i>Inbox</Link>
          <Link className="mdl-navigation__link" to="/"><i className="mdl-color-text--blue-grey-100 material-icons" role="presentation">delete</i>Trash</Link>
          <div className="mdl-layout-spacer"></div>
          <span className="mdl-navigation__link" onClick={this.logout.bind(this)} ><i className="mdl-color-text--blue-grey-100 material-icons" role="presentation">delete</i>logout</span>
        </nav>
      </div>
    );
  }
}

AppLeftNav.contextTypes = {
  user: React.PropTypes.object,
  isLoggedIn: React.PropTypes.bool
};

export default AppLeftNav;
