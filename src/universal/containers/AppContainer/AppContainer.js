import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { pushState } from 'redux-router';
import config from './../../../config';

import { AppHeader } from './../../components';
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

  static fetchData(getState, dispatch) {
    const promises = [];

    if (!isUserLoaded(getState())) {
      promises.push(dispatch(loadUserAction()));
    }
    return Promise.all(promises);
  }

  render() {
    const {user} = this.props;
    const isLoggedIn = !!user;
    const styles = require('./AppContainer.scss');

    return (
      <div>
        <DocumentMeta {...config.app} />

        <AppHeader isLoggedIn={isLoggedIn} />

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
