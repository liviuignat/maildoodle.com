import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { logoutAction } from './../../redux/reducers/auth';

@connect(
  state => ({user: state.auth.user}),
  { logoutAction }
)
export default class LogoutButton extends Component {
  static propTypes = {
    logoutAction: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  render() {
    const styles = require('./../AppHeader/AppHeader.scss');
    return (
      <span className={styles['AppHeader-navigationLink'] + ' mdl-navigation__link'}
        onClick={this.props.logoutAction}>Logout</span>
    );
  }
}
