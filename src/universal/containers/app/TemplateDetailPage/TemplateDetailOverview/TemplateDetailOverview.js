import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import {
  RaisedButton,
  Paper,
  SelectField,
  DialogForm
} from './../../../../components';
import PromoteTemplateToProductionForm, {FORM_NAME} from './../template-detail-forms/PromoteTemplateToProductionForm';
import TemplateVersionsList from './../TemplateVersionsList/TemplateVersionsList';

export default class TemplateDetailOverview extends Component {
  static propTypes = {
    isReadOnly: PropTypes.bool.isRequired,
    template: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    startSubmit: PropTypes.func.isRequired,
    promoteProductionVersion: PropTypes.func.isRequired,
    loadTemplateVersion: PropTypes.func.isRequired,
    changeProductionVersion: PropTypes.func.isRequired
  };

  get languagesSelectItems() {
    const {languages} = this.props.project;
    if (!languages) return [];

    return languages.map((language) => {
      return {
        value: language.objectId,
        text: language.name
      };
    });
  }

  get layoutsSelectItems() {
    const {layouts} = this.props.project;
    if (!layouts) return [];

    return layouts.map((project) => {
      return {
        value: project.objectId,
        text: project.name
      };
    });
  }

  isViewingOlderVersion(version) {
    const {template} = this.props;
    const {currentVersion} = template;
    return currentVersion.objectId === version.objectId;
  }

  startCommitToProduction() {
    this.props.startSubmit(FORM_NAME);
  }

  handleCommitToProduction(formData) {
    const {template} = this.props;
    const prodVersion = Object.assign({}, template.developmentVersion, formData);
    this.props.promoteProductionVersion(prodVersion);
    this.refs.promoteTemplateToProductionFormDialog.dismiss();
  }

  handlePreviewTemplate() {
    const {project, template} = this.props;
    const {currentVersion} = this.props.template;
    const {sampleJson} = currentVersion;
    const jsonString = JSON.stringify(JSON.parse(sampleJson));
    const layoutId = this.layoutsSelectItems[1];
    let url = `/api/projects/${project.objectId}/templates/${template.objectId}/generate?json=${jsonString}&layoutId=${layoutId}`;

    const viewedVersion =
      template.versions.filter((version) => version.objectId === currentVersion.objectId)[0];
    if (viewedVersion) {
      url += `&versionId=${viewedVersion.objectId}`;
    }

    window.open(url);
  }

  showCommitToProductionForm() {
    this.refs.promoteTemplateToProductionFormDialog.show();
  }

  renderTemplateVersion(version, index) {
    const {createdAt, commitMessage} = version;
    return (
      <div key={index}>
        {commitMessage} - {moment(createdAt).calendar()}
      </div>
    );
  }

  render() {
    const style = require('./TemplateDetailOverview.scss');
    const {project, template, isReadOnly} = this.props;
    const {versions} = template;

    return (
      <div className={style.TemplateDetailOverview}>
        <div className={style.TemplateDetailOverview_header}>
          <div className={style.TemplateDetailOverview_row}>
            <div className={style.TemplateDetailOverview_rowLabel}>PROJECT ID</div>
            <code className={style.TemplateDetailOverview_rowCell}>{project.objectId}</code>
          </div>
          <div className={style.TemplateDetailOverview_row}>
            <div className={style.TemplateDetailOverview_rowLabel}>TEMPLATE ID</div>
            <code className={style.TemplateDetailOverview_rowCell}>{template.objectId}</code>
          </div>
          <div className={style.TemplateDetailOverview_row}>
            <div className={style.TemplateDetailOverview_rowLabel}>TEMPLATE NAME</div>
            <code className={style.TemplateDetailOverview_rowCell}>{template.name}</code>
          </div>
          {template.description && <div className={style.TemplateDetailOverview_row}>
            <div className={style.TemplateDetailOverview_rowLabel}>TEMPLATE DESCRIPTION</div>
            <code className={style.TemplateDetailOverview_rowCell}>{template.description}</code>
          </div>}
        </div>

        <div className={style.TemplateDetailOverview_content}>
          <Paper className={style.TemplateDetailOverview_actionButtonGroup}>
            <div>
              <div>Choose a layout:</div>
              <SelectField menuItems={this.layoutsSelectItems}/>
            </div>
            <div>
              <div>Choose a language:</div>
              <SelectField menuItems={this.languagesSelectItems}/>
            </div>

            <div>
              <div className={style.TemplateDetailOverview_actionButtonContainer}>
                <RaisedButton
                  labelText="Preview html"
                  onClick={::this.handlePreviewTemplate}
                  orange />
              </div>
              <div className={style.TemplateDetailOverview_actionButtonContainer}>
                <RaisedButton
                  labelText="Preview pdf"
                  orange />
              </div>
              <div className="clearfix"/>
              {!isReadOnly && <div className={style.TemplateDetailOverview_commitButtonContainer}>
                <RaisedButton
                  labelText="Commit to production"
                  onClick={::this.showCommitToProductionForm}
                  fullWidth
                  primary />
              </div>}
              <div className="clearfix"/>
            </div>
          </Paper>

          <Paper className={style.TemplateDetailOverview_versionsContainer}>
            <div>
              <TemplateVersionsList
                subheader="Template Versions"
                items={versions}
                onViewPressed={(item) => {
                  this.props.loadTemplateVersion(item);
                }}
                onSetProductionPressed={(item) => {
                  this.props.changeProductionVersion(item);
                }}
                primaryText={(item) => {
                  return <span>{item.commitMessage}</span>;
                }}
                secondaryText={(item) => {
                  const templateCreatedDate = moment(item.createdAt).calendar();
                  const templateId = item.objectId;
                  const isViewingTag = <span className={style.TemplateDetailOverview__isViewingVersion}>view</span>;
                  const isProdTag = <span className={style.TemplateDetailOverview__isProductionVersion}>prod</span>;

                  return (<span>
                      {::this.isViewingOlderVersion(item) && isViewingTag}
                      {item.isProduction && isProdTag}
                      <code>{templateId}</code>
                      <span className={style.TemplateDetailOverview_templateVersionCreateDate}>{templateCreatedDate}</span>
                    </span>);
                }} />
            </div>
          </Paper>
        </div>

        <DialogForm
          ref="promoteTemplateToProductionFormDialog"
          title="Commit new production version"
          startSubmit={::this.startCommitToProduction}
          form={<PromoteTemplateToProductionForm onSubmit={::this.handleCommitToProduction}/>} />

      </div>
    );
  }
}
