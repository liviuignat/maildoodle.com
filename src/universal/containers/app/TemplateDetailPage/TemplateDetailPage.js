import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {startSubmit} from 'redux-form';
import config from './../../../../config';
import {
  getProjectDetailByIdAction,
  selectPreviewLanguage,
  selectPreviewLayout
} from './../../../redux/reducers/currentProject';
import {
  getTemplateDetailByIdAction,
  updateTemplateDevelopmentVersion,
  promoteTemplateToProductionVersion,
  loadTemplateVersion,
  changeProductionVersion
} from './../../../redux/reducers/currentTemplate';
import {
  Paper,
  Tabs,
  Tab
} from './../../../components';
import TemplateDetailOverview from './TemplateDetailOverview/TemplateDetailOverview';
import TemplateApiDocumentation from './TemplateApiDocumentation/TemplateApiDocumentation';
import TemplateDetailHtmlEditor from './TemplateDetailHtmlEditor/TemplateDetailHtmlEditor';
import TemplateDetailTestJsonEditor from './TemplateDetailTestJsonEditor/TemplateDetailTestJsonEditor';
import TemplateLanguages from './TemplateLanguages/TemplateLanguages';

@connect(
  state => ({
    template: state.currentTemplate.template,
    versions: state.currentTemplate.template.versions,
    project: state.currentProject.project,
    selectedLayout: state.currentProject.selectedLayout,
    selectedLanguage: state.currentProject.selectedLanguage
  }), {
    startSubmit,
    updateDevelopmentVersion: updateTemplateDevelopmentVersion,
    promoteProductionVersion: promoteTemplateToProductionVersion,
    changeSelectedLanguage: selectPreviewLanguage,
    changeSelectedLayout: selectPreviewLayout,
    loadTemplateVersion,
    changeProductionVersion
  })
export default class TemplateDetailPage extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired,
    versions: PropTypes.array.isRequired,
    project: PropTypes.object.isRequired,
    selectedLayout: PropTypes.object.isRequired,
    selectedLanguage: PropTypes.object.isRequired,
    startSubmit: PropTypes.func.isRequired,
    updateDevelopmentVersion: PropTypes.func.isRequired,
    promoteProductionVersion: PropTypes.func.isRequired,
    loadTemplateVersion: PropTypes.func.isRequired,
    changeProductionVersion: PropTypes.func.isRequired,
    changeSelectedLanguage: PropTypes.func.isRequired,
    changeSelectedLayout: PropTypes.func.isRequired,
  };

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

  changeProductionVersion(version) {
    const {template, project} = this.props;
    this.props.changeProductionVersion(project.objectId, template.objectId, version.objectId);
  }

  loadTemplateVersion(version) {
    this.props.loadTemplateVersion(version.objectId);
  }

  loadDevelopmentVersion() {
    this.props.loadTemplateVersion();
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
    const {
      template,
      project,
      selectedLayout,
      selectedLanguage,
      changeSelectedLanguage,
      changeSelectedLayout
    } = this.props;
    const {languages} = project;
    const {isTranslationsEnabled} = config.app;

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
                  project={project}
                  selectedLayout={selectedLayout}
                  changeSelectedLayout={changeSelectedLayout}
                  selectedLanguage={selectedLanguage}
                  changeSelectedLanguage={changeSelectedLanguage}
                  startSubmit={this.props.startSubmit}
                  promoteProductionVersion={::this.promoteProductionVersion}
                  loadTemplateVersion={::this.loadTemplateVersion}
                  changeProductionVersion={::this.changeProductionVersion}/>

                <TemplateApiDocumentation
                  project={project}
                  template={template} />
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
            <Tab label="Test JSON">
              <div className={style.TemplateDetailPage_tabContainer}>
                <TemplateDetailTestJsonEditor
                  isReadOnly={this.isViewingOldVersion}
                  template={template}
                  updateDevelopmentVersion={::this.updateDevelopmentVersion} />
              </div>
            </Tab>
            <Tab label="Translations" style={{visibility: isTranslationsEnabled ? 'visible' : 'hidden'}}>
              <div>
                <TemplateLanguages
                  isReadOnly={this.isViewingOldVersion}
                  template={template}
                  projectLanguages={languages} />
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    );
  }
}
