import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import {
  RaisedButton,
  Paper,
  SelectField,
  MenuItem,
  DialogForm
} from 'universal/components';
import {tryParse} from 'universal/helpers/json';
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
    changeProductionVersion: PropTypes.func.isRequired,
    selectedLayout: PropTypes.object.isRequired,
    selectedLanguage: PropTypes.object.isRequired,
    changeSelectedLanguage: PropTypes.func.isRequired,
    changeSelectedLayout: PropTypes.func.isRequired
  };

  getLayoutsSelectItems() {
    const {layouts} = this.props.project;
    return (layouts || [])
      .map((layout) => <MenuItem
        key={layout.objectId}
        value={layout.objectId}
        primaryText={layout.name} />);
  }

  getLanguageSelectItems() {
    const {languages} = this.props.project;
    return (languages || [])
      .map((language) => <MenuItem
        key={language.objectId}
        value={language.objectId}
        primaryText={language.name} />);
  }

  isViewingOlderVersion(version) {
    const {template} = this.props;
    const {currentVersion} = template;
    return currentVersion.objectId === version.objectId;
  }

  startCommitToProduction() {
    this.props.startSubmit(FORM_NAME);
  }

  handleLayoutChange(event, index, value) {
    this.props.changeSelectedLayout(value);
  }

  handleLanguageChange(event, index, value) {
    this.props.changeSelectedLanguage(value);
  }

  handleCommitToProduction(formData) {
    const {template} = this.props;
    const prodVersion = Object.assign({}, template.developmentVersion, formData);
    this.props.promoteProductionVersion(prodVersion);
    this.refs.promoteTemplateToProductionFormDialog.dismiss();
  }

  handlePreviewTemplate() {
    const {project, template, selectedLayout, selectedLanguage} = this.props;
    const {currentVersion} = this.props.template;
    const {sampleJson} = currentVersion;
    const jsonString = JSON.stringify(tryParse(sampleJson));
    const layoutId = selectedLayout.objectId;
    const lang = selectedLanguage.key;

    let url = `/api/projects/${project.objectId}/templates/${template.objectId}/generate?json=${jsonString}&layoutId=${layoutId}&lang=${lang}`;

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
    const {
      project,
      template,
      isReadOnly,
      selectedLayout,
      selectedLanguage
    } = this.props;
    const {versions} = template;

    const selectedLayoutId = selectedLayout ? selectedLayout.objectId : '';
    const selectedLanguageId = selectedLanguage ? selectedLanguage.objectId : '';

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
              <div>Choose a layout:{this.state && this.state.selectedLayoutId}</div>
              <SelectField
                value={selectedLayoutId}
                onChange={::this.handleLayoutChange}>
                {::this.getLayoutsSelectItems()}
              </SelectField>
            </div>
            <div>
              <div>Choose a language:</div>
              <SelectField
                value={selectedLanguageId}
                onChange={::this.handleLanguageChange}>
                {::this.getLanguageSelectItems()}
              </SelectField>
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
