import ThemeManager from 'material-ui/lib/styles/theme-manager';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import {getMuiTheme} from './../../theme/materialTheme';

import Helmet from 'react-helmet';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push as pushState} from 'react-router-redux';
import config from './../../../config';

import {asyncConnect} from 'redux-async-connect';

import {AppHeader, AppLeftNav, LinearProgress, GoogleAnalytics} from './../../components';
import {isUserLoaded, loadUserAction} from './../../redux/reducers/auth';

@asyncConnect([{
  promise: ({store: {getState, dispatch}}) => {
    if (!isUserLoaded(getState())) {
      return dispatch(loadUserAction());
    }
    return Promise.resolve();
  }
}])
@connect(
  ({auth, reduxAsyncConnect}) => ({
    reduxAsyncConnect,
    user: auth.user
  }),
  { pushState }
)
@themeDecorator(ThemeManager.getMuiTheme(getMuiTheme()))
export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    reduxAsyncConnect: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.pushState('/app');
    } else if (this.props.user && !nextProps.user) {
      this.props.pushState('/auth/login');
    }
  }

  getContentClassName(styles, isDrawerVisble) {
    let className = styles.AppContent;
    if (isDrawerVisble) {
      className += ' ' + styles.AppContent__isDrawerVisible;
    }
    return className;
  }

  get isLoggedIn() {
    return !!this.props.user;
  }

  render() {
    const styles = require('./AppContainer.scss');
    const{user} = this.props;
    const isDrawerVisble = this.isLoggedIn;
    const {reduxAsyncConnect} = this.props;
    const isRouterLoading = reduxAsyncConnect && !reduxAsyncConnect.loaded;

    return (
      <div className={styles.AppContainer}>
        <Helmet {...config.app}/>

        {<LinearProgress
          style={{
            position: 'absolute',
            top: '0',
            zIndex: '99999',
            visibility: isRouterLoading ? 'visible' : 'hidden'
          }}
          mode="indeterminate"/>}

        {!this.isLoggedIn && <AppHeader isLoggedIn={this.isLoggedIn} /> }

        {this.isLoggedIn && <AppLeftNav user={user} pushState={this.props.pushState} />}

        <div className={::this.getContentClassName(styles, isDrawerVisble)}>
          {this.props.children}
        </div>

        <GoogleAnalytics id={config.app.tracking.code} />
      </div>
    );
  }
}
