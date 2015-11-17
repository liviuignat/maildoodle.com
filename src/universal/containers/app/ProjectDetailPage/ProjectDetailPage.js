import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  getProjectDetailByIdAction
} from './../../../redux/reducers/currentProject';
import {
  List
} from './../../../components';

@connect(
  state => ({
    projectId: state.router.params.projectId,
    project: state.currentProject.project
  }), {
    getProjectDetailByIdAction
  })
export default class ProjectDetailPage extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    project: PropTypes.object
  }

  static fetchData(getState, dispatch, location, params) {
    const promises = [];
    promises.push(dispatch(getProjectDetailByIdAction(params.projectId)));
    return Promise.all(promises);
  }

  render() {
    const {project} = this.props;
    return (
      <div>
        <List subheader={project.name} />
      </div>
    );
  }
}
