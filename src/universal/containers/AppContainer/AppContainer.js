import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { pushState } from 'redux-router';
import config from './../../../config';

import { AppHeader, AppLeftNav } from './../../components';
import { isUserLoaded, loadUserAction } from './../../redux/reducers/auth';

@connect(
  state => ({user: state.auth.user}),
  { pushState }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
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
    const{user} = this.props;
    const isDrawerVisble = this.isLoggedIn;

    return (
      <div className={styles.AppContainer}>
        <DocumentMeta {...config.app} />

        <AppHeader isLoggedIn={this.isLoggedIn} />

        {this.isLoggedIn && <AppLeftNav user={user} /> }

        <div className={::this.getContentClassName(styles, isDrawerVisble)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
