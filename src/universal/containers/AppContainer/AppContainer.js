import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
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

  componentDidUpdate() {
    const domNode = ReactDom.findDOMNode(this);
    window.componentHandler.upgradeElement(domNode);
  }

  get isLoggedIn() {
    return !!this.props.user;
  }

  get layoutClassName() {
    let className = `mdl-layout mdl-js-layout mdl-layout--fixed-header`;
    if (this.isLoggedIn) {
      className += ` mdl-layout--fixed-drawer`;
    }
    return className;
  }

  static fetchData(getState, dispatch) {
    const promises = [];

    if (!isUserLoaded(getState())) {
      promises.push(dispatch(loadUserAction()));
    }
    return Promise.all(promises);
  }

  render() {
    const{user} = this.props;
    const styles = require('./AppContainer.scss');

    return (
      <div className={this.layoutClassName}>
        <DocumentMeta {...config.app} />

        <AppHeader isLoggedIn={this.isLoggedIn} />

        {this.isLoggedIn && <AppLeftNav user={user} /> }

        <div className={styles.appContent + ' mdl-layout__content'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
