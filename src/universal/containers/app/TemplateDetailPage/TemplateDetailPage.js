import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  getProjectDetailByIdAction
} from './../../../redux/reducers/currentProject';
import {
  getTemplateDetailByIdAction
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
    projectLayouts: state.currentProject.project.layouts,
    projectLanguages: state.currentProject.project.languages
  }), {
  })
export default class TemplateDetailPage extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired,
    projectLayouts: PropTypes.array.isRequired,
    projectLanguages: PropTypes.array.isRequired
  }

  static fetchData(getState, dispatch, location, params) {
    const promises = [];
    promises.push(dispatch(getProjectDetailByIdAction(params.projectId)));
    promises.push(dispatch(getTemplateDetailByIdAction(params.projectId, params.templateId)));
    return Promise.all(promises);
  }

  render() {
    const style = require('./TemplateDetailPage.scss');
    const { template, projectLanguages, projectLayouts } = this.props;

    return (
      <Paper className={style.TemplateDetailPage}>
      <Tabs>
        <Tab label="Overview">
          <div className={style.TemplateDetailPage_tabContainer}>
            <TemplateDetailOverview
              template={template}
              projectLanguages={projectLanguages}
              projectLayouts={projectLayouts}/>
          </div>
        </Tab>
        <Tab label="Html">
          <div className={style.TemplateDetailPage_tabContainer}>
            <TemplateDetailHtmlEditor template={template} />
          </div>
        </Tab>
        <Tab label="Translations">
          <div>
            <TemplateLanguages template={template} projectLanguages={projectLanguages} />
          </div>
        </Tab>
        <Tab label="Test JSON">
          <div className={style.TemplateDetailPage_tabContainer}>
            <TemplateDetailTestJsonEditor template={template} />
          </div>
        </Tab>
      </Tabs>
      </Paper>
    );
  }
}
