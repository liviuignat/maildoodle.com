import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import {getProjectsAction} from './../../../redux/reducers/projects';
import {FloatingActionButton} from './../../../components';
import AddProjectForm from './AddProjectForm';

@connect(
  state => ({projects: state.projects.list}), {
    initialize
  })
export default class ProjectListPage extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    projects: PropTypes.array
  }

  componentWillMount() {
    this.props.initialize('addProject', {});
  }

  handleAddProject(data) {
    console.log(data);
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
            onClick={::this.handleAddProject}>
            <span>+</span>
          </FloatingActionButton>
        </div>
        <ul>
          {projects.map(projectItem)}
        </ul>

        <AddProjectForm handleSubmit={::this.handleAddProject}/>
      </div>
    );
  }
}
