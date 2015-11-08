import React, { Component } from 'react';
import config from './../../../config';
import { Link } from 'react-router';
import LogoutButton from './../LogoutButton/LogoutButton';

class AppHeader extends Component {
  static propTypes = {
    isLoggedIn: React.PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
  }

  getHomeLink() {
    return this.props.isLoggedIn ? '/app' : '/';
  }

  render() {
    const { isLoggedIn } = this.props;
    const styles = require('./AppHeader.scss');

    return (
      <div className={styles.AppHeader}>
        <header className={'mdl-layout__header ' + styles.AppHeaderLayout}>
          <div className="mdl-layout__header-row">
            <Link className={'mdl-layout-title ' + styles['AppHeader-homeLink']} to={this.getHomeLink.call(this)}>{config.app.title}</Link>
            <div className={styles['AppHeader-navigationContainer']}>
            <nav className="mdl-navigation">
              {
                !isLoggedIn && <Link className={'mdl-navigation__link ' + styles['AppHeader-navigationLink']} to="/auth/login">Login</Link>
              }
              {
                isLoggedIn && <LogoutButton />
              }
             </nav>
            </div>
            <div className="mdl-layout-spacer"></div>
          </div>
        </header>
      </div>
    );
  }
}

export default AppHeader;
