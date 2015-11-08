import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class AppLeftNav extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const {user} = this.props;
    const styles = require('./AppLeftNav.scss');

    return (
      <div className={styles.AppLeftNav + ' mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50'}>
        <header className="AppLeftNav_header">
          <img src={ user.profilePhoto } className={styles.AppLeftNav_avatar} />
          <div className={styles.AppLeftNav_dropdown}>
            <span>{ user.displayName }</span>
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
        <nav className={styles.AppLeftNav_navigation + ' mdl-navigation mdl-color--blue-grey-800'}>
          <Link className={styles.AppLeftNav_navigationLink + ' mdl-navigation__link'} to="/app">
            <i className={styles.AppLeftNav_navigationIcon + ' material-icons'} role="presentation">home</i>Dashboard
          </Link>
          <Link className={styles.AppLeftNav_navigationLink + ' mdl-navigation__link'} to="/app/my-account">
            <i className={styles.AppLeftNav_navigationIcon + ' material-icons'} role="presentation">inbox</i>My Account
          </Link>
          <Link className={styles.AppLeftNav_navigationLink + ' mdl-navigation__link'} to="/app">
            <i className={styles.AppLeftNav_navigationIcon + ' material-icons'} role="presentation">delete</i>Trash
          </Link>
          <div className="mdl-layout-spacer"></div>

          <span className="AppLeftNav_logout mdl-navigation__link">
            <i className="AppLeftNav_navigationIcon material-icons" role="presentation">delete</i>Logout
          </span>
        </nav>
      </div>
    );
  }
}
