import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppLeftNavLogoutButton from './AppLeftNavLogoutButton';

export default class AppLeftNav extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const {user} = this.props;
    const styles = require('./AppLeftNav.scss');

    return (
      <div className={styles.AppLeftNav}>
        <header className={styles.AppLeftNav_header}>
          <img src={ user.profilePhoto } className={styles.AppLeftNav_avatar} />
          <div className={styles.AppLeftNav_displayNameContainer}>
            <span>{ user.displayName }</span>
          </div>
        </header>
        <nav className={styles.AppLeftNav_navigation}>
          <Link className={styles.AppLeftNav_navigationLink} to="/app">
            Dashboard
          </Link>
          <Link className={styles.AppLeftNav_navigationLink} to="/app/my-account">
            My Account
          </Link>

          <div className={styles.AppLeftNav_navigationLinkSpacer} />

          <AppLeftNavLogoutButton />
        </nav>
      </div>
    );
  }
}
