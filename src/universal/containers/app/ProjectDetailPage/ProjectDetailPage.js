import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({project: state.currentProject}), {
  })
export default class ProjectDetailPage extends Component {
  static propTypes = {
    project: PropTypes.object
  }

  render() {
    return (
      <div>
        <h2> Project detail </h2>
      </div>
    );
  }
}
