import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { logoutAction } from './../../redux/reducers/auth';

@connect(
  state => ({user: state.auth.user}),
  { logoutAction }
)
export default class AppLeftNavLogoutButton extends Component {
  static propTypes = {
    logoutAction: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  render() {
    const styles = require('./AppLeftNav.scss');
    return (
      <span className={styles.AppLeftNav_logout}
        onClick={this.props.logoutAction}>
        <i className="fa fa-circle-o-notch"/><span className={styles.AppLeftNav_linkText}>Logout</span>
        </span>
    );
  }
}
