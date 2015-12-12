import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  getProjectDetailByIdAction
} from './../../../redux/reducers/currentProject';
import {
  GenericList
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
        <GenericList subheader="templates"
          items={project.templates}
          onEditPressed={() => {}}
          onDeletePressed={() => {}}
          onAddPressed={() => {}}
          onRowClick={() => {}}
          primaryText={(item) => item.name}
          secondaryText={(item) => item.description}/>

        <GenericList subheader="layouts"
          items={project.layouts}
          onEditPressed={() => {}}
          onDeletePressed={() => {}}
          onAddPressed={() => {}}
          onRowClick={() => {}}
          primaryText={(item) => item.name}
          secondaryText={(item) => item.value}/>

        <GenericList subheader="languages"
          items={project.languages}
          onEditPressed={() => {}}
          onDeletePressed={() => {}}
          onAddPressed={() => {}}
          onRowClick={() => {}}
          primaryText={(item) => item.key}
          secondaryText={(item) => item.name}/>
      </div>
    );
  }
}
