import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  getProjectDetailByIdAction
} from './../../../redux/reducers/currentProject';
import {
  getTemplateDetailByIdAction,
  updateTemplateDevelopmentVersion
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
    project: state.currentProject.project
  }), {
    updateDevelopmentVersion: updateTemplateDevelopmentVersion
  })
export default class TemplateDetailPage extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    updateDevelopmentVersion: PropTypes.func.isRequired
  }

  static fetchData(getState, dispatch, location, params) {
    const promises = [];
    promises.push(dispatch(getProjectDetailByIdAction(params.projectId)));
    promises.push(dispatch(getTemplateDetailByIdAction(params.projectId, params.templateId)));
    return Promise.all(promises);
  }

  updateDevelopmentVersion(version) {
    const {template, project} = this.props;
    this.props.updateDevelopmentVersion(project.objectId, template.objectId, version);
  }

  render() {
    const style = require('./TemplateDetailPage.scss');
    const {template, project} = this.props;
    const {languages, layouts} = project;

    return (
      <Paper className={style.TemplateDetailPage}>
      <Tabs>
        <Tab label="Overview">
          <div className={style.TemplateDetailPage_tabContainer}>
            <TemplateDetailOverview
              template={template}
              projectLanguages={languages}
              projectLayouts={layouts}/>
          </div>
        </Tab>
        <Tab label="Html">
          <div className={style.TemplateDetailPage_tabContainer}>
            <TemplateDetailHtmlEditor
              template={template}
              updateDevelopmentVersion={::this.updateDevelopmentVersion} />
          </div>
        </Tab>
        <Tab label="Translations">
          <div>
            <TemplateLanguages
              template={template}
              projectLanguages={languages} />
          </div>
        </Tab>
        <Tab label="Test JSON">
          <div className={style.TemplateDetailPage_tabContainer}>
            <TemplateDetailTestJsonEditor
              template={template}
              updateDevelopmentVersion={::this.updateDevelopmentVersion} />
          </div>
        </Tab>
      </Tabs>
      </Paper>
    );
  }
}
