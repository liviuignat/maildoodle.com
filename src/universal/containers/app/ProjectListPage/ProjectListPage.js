import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {push} from 'react-router-redux';
import {initialize as initializeForm, startSubmit} from 'redux-form';
import {
  getProjectsAction,
  insertProjectAction,
  updateProjectAction,
  deleteProjectAction
} from './../../../redux/reducers/projects';
import AddProjectForm, {ADD_PROJECT_FORM_NAME} from './AddProjectForm';
import {
  FloatingActionButton,
  DialogForm,
  List,
  ListItem,
  Divider,
  IconButton,
  IconMenu,
  MenuItem,
  FontIcon
} from './../../../components';

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(getProjectsAction()));
    return Promise.all(promises);
  }
}])
@connect(
  state => ({projects: state.projects.list}), {
    push,
    initializeForm,
    startSubmit,
    insertProjectAction,
    updateProjectAction,
    deleteProjectAction
  })
export default class ProjectListPage extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    startSubmit: PropTypes.func.isRequired,
    insertProjectAction: PropTypes.func.isRequired,
    updateProjectAction: PropTypes.func.isRequired,
    deleteProjectAction: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  navigateToDetails(project) {
    return () => {
      const url = `/app/projects/${project.objectId}`;
      this.props.push(url);
    };
  }

  openAddProjectDialog() {
    this.props.initializeForm(ADD_PROJECT_FORM_NAME, {});
    this.refs.addProjectDialog.show();
  }

  startSubmitAddProject() {
    this.props.startSubmit(ADD_PROJECT_FORM_NAME);
  }

  handleAddProjectSubmit(data) {
    this.refs.addProjectDialog.dismiss();
    this.props.insertProjectAction(data);
  }

  openEditProjectDialog(project) {
    return () => {
      this.props.initializeForm(ADD_PROJECT_FORM_NAME, project);
      this.refs.editProjectDialog.show();
    };
  }

  startSubmitEditProject() {
    this.props.startSubmit(ADD_PROJECT_FORM_NAME);
  }

  handleEditProjectSubmit(data) {
    this.refs.editProjectDialog.dismiss();
    this.props.updateProjectAction(data);
  }

  handleDeleteProjectSubmit(project) {
    return () => {
      this.props.deleteProjectAction(project);
    };
  }

  render() {
    const style = require('./ProjectListPage.scss');
    const { projects } = this.props;

    const listItemIconMenu = (project) => (
      <IconMenu
        iconButtonElement={
          <IconButton tooltip="more...">
            <FontIcon className="material-icons">more_vert</FontIcon>
          </IconButton>
        }>
        <MenuItem primaryText="Edit" onClick={::this.openEditProjectDialog(project)}/>
        <MenuItem primaryText="Delete" onClick={::this.handleDeleteProjectSubmit(project)}/>
      </IconMenu>
    );

    const projectItem = (project, index) => (
        <div key={index}>
          <Divider />
          <ListItem
            rightIconButton={listItemIconMenu(project)}
            primaryText={(
              <div onClick={::this.navigateToDetails(project)} className={style.ProjectListPage_listItemName}>
                {project.name}
              </div>)}
            secondaryText={
              project.description &&
              (<div onClick={::this.navigateToDetails(project)}>
                <div className={style.ProjectListPage_listDescription}>{project.description}</div>
              </div>)
            }
            secondaryTextLines={1}/>
        </div>
      );

    return (
      <div className={style.ProjectListPage}>
        <div className={style.ProjectListPage_addButtonContainer}>
          <FloatingActionButton
            primary
            mini
            style={{
              margin: '0 16px',
              position: 'absolute',
              right: '0'
            }}
            onClick={::this.openAddProjectDialog}>
            <span>+</span>
          </FloatingActionButton>
        </div>

        <List subheader="List of projects">
          {projects.map(projectItem)}
        </List>

        <DialogForm
          title="Edit project"
          ref="editProjectDialog"
          startSubmit={::this.startSubmitEditProject}
          form={<AddProjectForm onSubmit={::this.handleEditProjectSubmit}/>} />

        <DialogForm
          title="Add new project"
          ref="addProjectDialog"
          startSubmit={::this.startSubmitAddProject}
          form={<AddProjectForm onSubmit={::this.handleAddProjectSubmit}/>} />

      </div>
    );
  }
}
