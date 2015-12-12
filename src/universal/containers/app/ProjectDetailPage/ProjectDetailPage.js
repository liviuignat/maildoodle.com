import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize as initializeForm, startSubmit} from 'redux-form';
import { pushState } from 'redux-router';
import {
  getProjectDetailByIdAction,
  insertTemplateAction,
  updateTemplateAction,
  deleteTemplateAction
} from './../../../redux/reducers/currentProject';
import { GenericList } from './../../../components';
import TemplatesList from './TemplatesList';

@connect(
  state => ({
    projectId: state.router.params.projectId,
    project: state.currentProject.project,
    templates: state.currentProject.project.templates,
  }), {
    pushState,
    initializeForm,
    startSubmit,
    getProjectDetailByIdAction,
    insertTemplateAction,
    updateTemplateAction,
    deleteTemplateAction
  })
export default class ProjectDetailPage extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    project: PropTypes.object,
    templates: PropTypes.array,
    pushState: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    startSubmit: PropTypes.func.isRequired,
    insertTemplateAction: PropTypes.func.isRequired,
    updateTemplateAction: PropTypes.func.isRequired,
    deleteTemplateAction: PropTypes.func.isRequired
  }

  static fetchData(getState, dispatch, location, params) {
    const promises = [];
    promises.push(dispatch(getProjectDetailByIdAction(params.projectId)));
    return Promise.all(promises);
  }

  render() {
    const { project, templates } = this.props;

    return (
      <div>
        <TemplatesList
          project={project}
          templates={templates}
          pushState={this.props.pushState}
          initializeForm={this.props.initializeForm}
          startSubmit={this.props.startSubmit}
          insertTemplateAction={this.props.insertTemplateAction}
          updateTemplateAction={this.props.updateTemplateAction}
          deleteTemplateAction={this.props.deleteTemplateAction} />

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
