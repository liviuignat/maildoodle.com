import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
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

@connect(
  state => ({template: state.currentTemplate.template}), {
  })
export default class TemplateDetailPage extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired
  }

  static fetchData(getState, dispatch, location, params) {
    const promises = [];
    promises.push(dispatch(getTemplateDetailByIdAction(params.projectId, params.templateId)));
    return Promise.all(promises);
  }

  render() {
    const style = require('./TemplateDetailPage.scss');
    const { template } = this.props;

    return (
      <Paper className={style.TemplateDetailPage}>
      <Tabs>
        <Tab label="Overview">
          <div className={style.TemplateDetailPage_tabContainer}>
            <TemplateDetailOverview template={template} />
          </div>
        </Tab>
        <Tab label="Html">
          <div className={style.TemplateDetailPage_tabContainer}>
            <TemplateDetailHtmlEditor template={template} />
          </div>
        </Tab>
        <Tab label="Translations">
          <div className={style.TemplateDetailPage_tabContainer}>
            Translations
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
