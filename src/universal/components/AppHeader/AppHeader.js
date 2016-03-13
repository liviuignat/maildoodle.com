import React, { Component } from 'react';
import config from './../../../config';
import {Link} from 'react-router';
import {Logo} from './../index';

class AppHeader extends Component {
  static propTypes = {
    isLoggedIn: React.PropTypes.bool
  };

  getAppHeaderClassName(styles, isDrawerVisble) {
    let className = styles.AppHeader;
    if (isDrawerVisble) {
      className += ' ' + styles.AppHeader__isDrawerVisible;
    }
    return className;
  }

  get homeLink() {
    return this.props.isLoggedIn ? '/app' : '/';
  }

  render() {
    const { isLoggedIn } = this.props;
    const isDrawerVisble = isLoggedIn;
    const styles = require('./AppHeader.scss');

    return (
      <header className={::this.getAppHeaderClassName(styles, isDrawerVisble)}>
        <div className={styles.AppHeader_row}>
          <Logo size={25} />
          <Link className={styles.AppHeader_headerTitle} to={this.homeLink}>{config.app.title}</Link>
          <div className={styles.AppHeader_navigationContainer}>
            <nav>
              {
                !isLoggedIn && <Link className={styles.AppHeader_navigationLink}
                                     to="/auth/login">Login</Link>
              }
              <Link className={styles.AppHeader_navigationLink}
                to="/documentation">Documentation</Link>
             </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default AppHeader;
