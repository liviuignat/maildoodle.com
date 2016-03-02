import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize as initializeForm, startSubmit} from 'redux-form';
import { pushState } from 'redux-router';
import config from './../../../../config';
import {
  getProjectDetailByIdAction,
  insertTemplateAction,
  updateTemplateAction,
  deleteTemplateAction,
  insertLayoutAction,
  updateLayoutAction,
  deleteLayoutAction
} from './../../../redux/reducers/currentProject';
import { GenericList } from './../../../components';
import TemplatesList from './TemplatesList';
import LayoutsList from './LayoutsList';

@connect(
  state => ({
    projectId: state.router.params.projectId,
    project: state.currentProject.project,
    templates: state.currentProject.project.templates,
    layouts: state.currentProject.project.layouts
  }), {
    pushState,
    initializeForm,
    startSubmit,
    getProjectDetailByIdAction,
    insertTemplateAction,
    updateTemplateAction,
    deleteTemplateAction,
    insertLayoutAction,
    updateLayoutAction,
    deleteLayoutAction
  })
export default class ProjectDetailPage extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    project: PropTypes.object,
    templates: PropTypes.array,
    layouts: PropTypes.array,
    pushState: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    startSubmit: PropTypes.func.isRequired,
    insertTemplateAction: PropTypes.func.isRequired,
    updateTemplateAction: PropTypes.func.isRequired,
    deleteTemplateAction: PropTypes.func.isRequired,
    insertLayoutAction: PropTypes.func.isRequired,
    updateLayoutAction: PropTypes.func.isRequired,
    deleteLayoutAction: PropTypes.func.isRequired
  };

  static fetchData(getState, dispatch, location, params) {
    const promises = [];
    promises.push(dispatch(getProjectDetailByIdAction(params.projectId)));
    return Promise.all(promises);
  }

  render() {
    const { project, templates, layouts } = this.props;
    const {isTranslationsEnabled} = config.app;

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

        <LayoutsList
          project={project}
          layouts={layouts}
          pushState={this.props.pushState}
          initializeForm={this.props.initializeForm}
          startSubmit={this.props.startSubmit}
          insertLayoutAction={this.props.insertLayoutAction}
          updateLayoutAction={this.props.updateLayoutAction}
          deleteLayoutAction={this.props.deleteLayoutAction} />

        {isTranslationsEnabled && <GenericList subheader="languages"
          items={project.languages}
          onEditPressed={() => {}}
          onDeletePressed={() => {}}
          onAddPressed={() => {}}
          onRowClick={() => {}}
          primaryText={(item) => item.key}
          secondaryText={(item) => item.name}/>}
      </div>
    );
  }
}
