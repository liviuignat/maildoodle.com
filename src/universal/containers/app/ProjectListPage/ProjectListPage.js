import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize, startSubmit} from 'redux-form';
import {getProjectsAction} from './../../../redux/reducers/projects';
import {FloatingActionButton, DialogForm} from './../../../components';
import AddProjectForm, {ADD_PROJECT_FORM_NAME} from './AddProjectForm';

@connect(
  state => ({projects: state.projects.list}), {
    initialize,
    startSubmit
  })
export default class ProjectListPage extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    startSubmit: PropTypes.func.isRequired,
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

  startSubmit() {
    this.props.startSubmit(ADD_PROJECT_FORM_NAME);
  }

  handleAddProjectSubmit(data) {
    console.log('handleAddProjectSubmit', data);
    this.refs.addProjectDialog.dismiss();
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    promises.push(dispatch(getProjectsAction()));
    return Promise.all(promises);
  }

  render() {
    const style = require('./ProjectListPage.scss');
    const { projects } = this.props;

    const projectItem = (project, index) =>
      <li key={index}>
        {project.name}
      </li>;

    return (
      <div className={style.ProjectListPage}>
        <div className={style.ProjectListPage_title}>
          <span>List of projects</span>
          <FloatingActionButton
            primary
            mini
            style={{
              margin: '0 16px',
              position: 'relative',
              top: '8px'
            }}
            onClick={::this.openAddProjectDialog}>
            <span>+</span>
          </FloatingActionButton>
        </div>

        <ul>
          {projects.map(projectItem)}
        </ul>

        <DialogForm
          ref="addProjectDialog"
          startSubmit={::this.startSubmit}
          form={<AddProjectForm onSubmit={::this.handleAddProjectSubmit}/>} />

      </div>
    );
  }
}
