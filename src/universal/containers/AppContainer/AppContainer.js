import ThemeManager from 'material-ui/lib/styles/theme-manager';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import {getMuiTheme} from './../../theme/materialTheme';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {pushState} from 'redux-router';
import config from './../../../config';

import {AppHeader, AppLeftNav, LinearProgress} from './../../components';
import {isUserLoaded, loadUserAction} from './../../redux/reducers/auth';

@connect(
  state => ({
    isRouterLoading: state.appLoading.isLoading,
    user: state.auth.user
  }),
  { pushState }
)
@themeDecorator(ThemeManager.getMuiTheme(getMuiTheme()))
export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    isRouterLoading: PropTypes.bool,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.pushState(null, '/app');
    } else if (this.props.user && !nextProps.user) {
      this.props.pushState(null, '/auth/login');
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

  static fetchData(getState, dispatch) {
    const promises = [];

    if (!isUserLoaded(getState())) {
      promises.push(dispatch(loadUserAction()));
    }
    return Promise.all(promises);
  }

  render() {
    const styles = require('./AppContainer.scss');
    const{isRouterLoading, user} = this.props;
    const isDrawerVisble = this.isLoggedIn;

    return (
      <div className={styles.AppContainer}>
        <DocumentMeta {...config.app} />

        {<LinearProgress
          style={{
            position: 'absolute',
            top: '0',
            zIndex: '99999',
            visibility: isRouterLoading ? 'visible' : 'hidden'
          }}
          mode="indeterminate"/>}

        <AppHeader isLoggedIn={this.isLoggedIn} />

        {this.isLoggedIn && <AppLeftNav user={user} pushState={this.props.pushState} />}

        <div className={::this.getContentClassName(styles, isDrawerVisble)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
