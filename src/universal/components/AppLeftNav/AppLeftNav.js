import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppLeftNavLogoutButton from './AppLeftNavLogoutButton';

export default class AppLeftNav extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };

  navigateToMyAccount() {
    this.props.pushState(null, '/app/my-account');
  }

  render() {
    const {user} = this.props;
    const styles = require('./AppLeftNav.scss');

    return (
      <div className={styles.AppLeftNav}>
        <header className={styles.AppLeftNav_header} onClick={::this.navigateToMyAccount}>
          <img src={ user.profilePhoto } className={styles.AppLeftNav_avatar} />
          <div className={styles.AppLeftNav_displayNameContainer}>
            <span>{ user.displayName }</span>
          </div>
        </header>
        <nav className={styles.AppLeftNav_navigation}>
          <Link style={{display: 'none'}} className={styles.AppLeftNav_navigationLink} to="/app">
            <i className={"fa fa-dashboard"}/><span className={styles.AppLeftNav_linkText}>Dashboard</span>
          </Link>
          <Link className={styles.AppLeftNav_navigationLink} to="/app/my-account">
            <i className="fa fa-user"/><span className={styles.AppLeftNav_linkText}>My Account</span>
          </Link>

          <div className={styles.AppLeftNav_navigationLinkSpacer} />

          <Link className={styles.AppLeftNav_navigationLink} to="/app/projects">
            <i className="fa fa-list"/><span className={styles.AppLeftNav_linkText}>Projects</span>
          </Link>

          <div className={styles.AppLeftNav_navigationLinkSpacer} />

          <AppLeftNavLogoutButton />
        </nav>
      </div>
    );
  }
}
