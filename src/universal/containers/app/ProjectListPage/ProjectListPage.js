import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({user: state.projects}), {}
  )
export default class ProjectListPage extends Component {
  static propTypes = {
    projects: PropTypes.array
  }

  render() {
    const { projects } = this.props;

    return (
      <div>
        <h2> List of projects </h2>
        {projects}
      </div>
    );
  }
}
