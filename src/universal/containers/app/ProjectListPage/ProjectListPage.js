import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize, startSubmit} from 'redux-form';
import {getProjectsAction, insertProjectsAction} from './../../../redux/reducers/projects';
import AddProjectForm, {ADD_PROJECT_FORM_NAME} from './AddProjectForm';
import {
  FloatingActionButton,
  DialogForm,
  List,
  ListItem,
  ListDivider,
  IconButton,
  IconMenu,
  MenuItem,
  FontIcon
} from './../../../components';

@connect(
  state => ({projects: state.projects.list}), {
    initialize,
    startSubmit,
    insertProjectsAction
  })
export default class ProjectListPage extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    startSubmit: PropTypes.func.isRequired,
    insertProjectsAction: PropTypes.func.isRequired,
    projects: PropTypes.array
  }

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.initialize(ADD_PROJECT_FORM_NAME, {});
  }

  openAddProjectDialog() {
    this.refs.addProjectDialog.show();
  }

  startSubmitAddProject() {
    this.props.startSubmit(ADD_PROJECT_FORM_NAME);
  }

  handleAddProjectSubmit(data) {
    this.refs.addProjectDialog.dismiss();
    this.props.insertProjectsAction(data);
  }

  openEditProjectDialog(project) {
    console.log('openEditProjectDialog', project);
  }

  openConfirmDeleteProjectDialog(project) {
    console.log('openConfirmDeleteProjectDialog', project);
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    promises.push(dispatch(getProjectsAction()));
    return Promise.all(promises);
  }

  render() {
    const style = require('./ProjectListPage.scss');
    const { projects } = this.props;

    const listItemIconMenu = () => (
      <IconMenu
        iconButtonElement={
          <IconButton tooltip="more...">
            <FontIcon className="material-icons">more_vert</FontIcon>
          </IconButton>
        }>
        <MenuItem primaryText="Edit" />
        <MenuItem primaryText="Delete" />
      </IconMenu>
    );

    const projectItem = (project, index) => (
        <div key={index}>
          <ListDivider />
          <ListItem
            rightIconButton={listItemIconMenu()}
            primaryText={<div>{project.identifier}</div>}
            secondaryText={
              <div>
                <div>{project.name}</div>
                <div>{project.description}</div>
              </div>
            }/>
        </div>
      );


    return (
      <div className={style.ProjectListPage}>
        <div style={{position: 'relative', height: '20px'}}>
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
          ref="addProjectDialog"
          startSubmit={::this.startSubmitAddProject}
          form={<AddProjectForm onSubmit={::this.handleAddProjectSubmit}/>} />

      </div>
    );
  }
}
