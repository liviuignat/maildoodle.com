import React, { Component } from 'react';
import config from './../../../config';
import { Link } from 'react-router';
import LogoutButton from './../LogoutButton/LogoutButton';

class AppHeader extends Component {
  static propTypes = {
    isLoggedIn: React.PropTypes.bool
  };

  get homeLink() {
    return this.props.isLoggedIn ? '/app' : '/';
  }

  render() {
    const { isLoggedIn } = this.props;
    const styles = require('./AppHeader.scss');

    return (
      <header className={styles.AppHeader_layout + ' mdl-layout__header'}>
        <div className="mdl-layout__header-row">
          <Link className={styles.AppHeader_homeLink + ' mdl-layout-title'} to={this.homeLink}>{config.app.title}</Link>
          <div className={styles.AppHeader_navigationContainer}>
          <nav className="mdl-navigation">
            {
              !isLoggedIn && <Link className={styles.AppHeader_navigationLink + ' mdl-navigation__link'} to="/auth/login">Login</Link>
            }
            {
              isLoggedIn && <LogoutButton />
            }
           </nav>
          </div>
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    );
  }
}

export default AppHeader;
