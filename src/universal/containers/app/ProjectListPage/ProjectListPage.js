import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize, startSubmit, stopSubmit} from 'redux-form';
import {getProjectsAction} from './../../../redux/reducers/projects';
import {Dialog, FlatButton, FloatingActionButton} from './../../../components';
import AddProjectForm from './AddProjectForm';

@connect(
  state => ({projects: state.projects.list}), {
    initialize,
    startSubmit,
    stopSubmit
  })
export default class ProjectListPage extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    startSubmit: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    projects: PropTypes.array
  }

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.initialize('addProjectForm', {});
  }

  openAddProjectDialog() {
    this.refs.addProjectDialog.show();
  }

  saveAddProjectDialog() {
    this.props.startSubmit('addProjectForm');
  }

  closeAddProjectDialog() {
    this.refs.addProjectDialog.dismiss();
  }

  handleAddProjectSubmit(data) {
    console.log('handleAddProjectSubmit', data);
    this.props.stopSubmit('addProjectForm');
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

        <Dialog
          ref="addProjectDialog"
          title="Add project"
          actionFocus="submit"
          modal
          autoDetectWindowHeight
          autoScrollBodyContent
          actions={[
            <FlatButton
              key="1"
              label="Cancel"
              secondary
              onClick={::this.closeAddProjectDialog} />,
            <FlatButton
              key="2"
              ref="submit"
              label="Submit"
              primary
              onClick={::this.saveAddProjectDialog} />
          ]}>
          <AddProjectForm
            ref="addProjectForm"
            onSubmit={::this.handleAddProjectSubmit}/>
        </Dialog>

      </div>
    );
  }
}
