import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {startSubmit} from 'redux-form';
import {
  getProjectDetailByIdAction
} from './../../../redux/reducers/currentProject';
import {
  getTemplateDetailByIdAction,
  updateTemplateDevelopmentVersion,
  promoteTemplateToProductionVersion,
  loadTemplateVersionHistory
} from './../../../redux/reducers/currentTemplate';
import {
  Paper,
  Tabs,
  Tab
} from './../../../components';
import TemplateDetailOverview from './TemplateDetailOverview/TemplateDetailOverview';
import TemplateDetailHtmlEditor from './TemplateDetailHtmlEditor/TemplateDetailHtmlEditor';
import TemplateDetailTestJsonEditor from './TemplateDetailTestJsonEditor/TemplateDetailTestJsonEditor';
import TemplateLanguages from './TemplateLanguages/TemplateLanguages';

@connect(
  state => ({
    template: state.currentTemplate.template,
    versions: state.currentTemplate.template.versions,
    project: state.currentProject.project
  }), {
    startSubmit,
    updateDevelopmentVersion: updateTemplateDevelopmentVersion,
    promoteProductionVersion: promoteTemplateToProductionVersion,
    loadVersionHistory: loadTemplateVersionHistory
  })
export default class TemplateDetailPage extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired,
    versions: PropTypes.array.isRequired,
    project: PropTypes.object.isRequired,
    startSubmit: PropTypes.func.isRequired,
    updateDevelopmentVersion: PropTypes.func.isRequired,
    promoteProductionVersion: PropTypes.func.isRequired,
    loadVersionHistory: PropTypes.func.isRequired
  }

  static fetchData(getState, dispatch, location, params) {
    const promises = [];
    promises.push(dispatch(getProjectDetailByIdAction(params.projectId)));
    promises.push(dispatch(getTemplateDetailByIdAction(params.projectId, params.templateId)));
    return Promise.all(promises);
  }

  get isViewingOldVersion() {
    const {template} = this.props;
    const {currentVersion} = template;
    return !currentVersion.isDevelopment;
  }

  updateDevelopmentVersion(version) {
    const {template, project} = this.props;
    this.props.updateDevelopmentVersion(project.objectId, template.objectId, version);
  }

  promoteProductionVersion(version) {
    const {template, project} = this.props;
    this.props.promoteProductionVersion(project.objectId, template.objectId, version);
  }

  loadDevelopmentVersion() {
    this.props.loadVersionHistory();
  }

  renderViewDevelopmentVersion(currentVersion) {
    const style = require('./TemplateDetailPage.scss');
    const span = (
      <span className={style.TemplateDetailPage_loadDevelopmentVersion}
        onClick={::this.loadDevelopmentVersion}>here</span>
    );
    const commitName = (
      <span className={style.TemplateDetailPage_loadedVersionCommitName}>{currentVersion.commitMessage}</span>
    );

    return (
      <div className={style.TemplateDetailPage_headerMessage}>
        <div>
          You are currently viewing an older version. Press {span} to load the most recent version.&nbsp;
          {!!currentVersion.commitMessage && <span>You are viewing: {commitName}</span>}
        </div>
      </div>
    );
  }

  renderTopActions(template) {
    const {currentVersion} = template;
    return (
      <div>
        {this.isViewingOldVersion && ::this.renderViewDevelopmentVersion(currentVersion)}
      </div>
    );
  }

  render() {
    const style = require('./TemplateDetailPage.scss');
    const {template, project} = this.props;
    const {languages, layouts} = project;

    return (
      <div>
        {::this.renderTopActions(template)}
        <Paper className={style.TemplateDetailPage}>
          <Tabs>
            <Tab label="Overview">
              <div className={style.TemplateDetailPage_tabContainer}>
                <TemplateDetailOverview
                  isReadOnly={this.isViewingOldVersion}
                  template={template}
                  projectLanguages={languages}
                  projectLayouts={layouts}
                  startSubmit={this.props.startSubmit}
                  promoteProductionVersion={::this.promoteProductionVersion}
                  loadVersionHistory={::this.props.loadVersionHistory}/>
              </div>
            </Tab>
            <Tab label="Html">
              <div className={style.TemplateDetailPage_tabContainer}>
                <TemplateDetailHtmlEditor
                  isReadOnly={this.isViewingOldVersion}
                  template={template}
                  updateDevelopmentVersion={::this.updateDevelopmentVersion} />
              </div>
            </Tab>
            <Tab label="Translations">
              <div>
                <TemplateLanguages
                  isReadOnly={this.isViewingOldVersion}
                  template={template}
                  projectLanguages={languages} />
              </div>
            </Tab>
            <Tab label="Test JSON">
              <div className={style.TemplateDetailPage_tabContainer}>
                <TemplateDetailTestJsonEditor
                  isReadOnly={this.isViewingOldVersion}
                  template={template}
                  updateDevelopmentVersion={::this.updateDevelopmentVersion} />
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    );
  }
}
