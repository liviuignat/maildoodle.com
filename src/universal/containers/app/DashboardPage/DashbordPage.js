import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';

@connect(
  state => ({user: state.auth.user}), {}
  )
export default class DashboardPage extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    const { user } = this.props;

    if (!user) {
      return <div />;
    }

    return (
      <div>
        <Helmet title={`maildoodle - Dashboard`} />

        <h2> Hi {user.displayName} </h2>
      </div>
    );
  }
}
