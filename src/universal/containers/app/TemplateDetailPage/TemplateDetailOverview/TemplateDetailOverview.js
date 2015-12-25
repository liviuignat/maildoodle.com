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
    projectLanguages: PropTypes.array.isRequired,
    projectLayouts: PropTypes.array.isRequired,
    startSubmit: PropTypes.func.isRequired,
    promoteProductionVersion: PropTypes.func.isRequired,
    loadVersionHistory: PropTypes.func.isRequired
  }

  get languagesSelectItems() {
    const {projectLanguages} = this.props;
    if (!projectLanguages) return [];

    return projectLanguages.map((language) => {
      return {
        id: language.objectId,
        text: language.name
      };
    });
  }

  get layoutsSelectItems() {
    const {projectLayouts} = this.props;
    if (!projectLayouts) return [];

    return projectLayouts.map((project) => {
      return {
        id: project.objectId,
        text: project.name
      };
    });
  }

  isCurrentlyViewingOlderVersion(version) {
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
    const {template, isReadOnly} = this.props;
    const {versions} = template;

    return (
      <div className={style.TemplateDetailOverview}>
        <div className={style.TemplateDetailOverview_header}>
          <div className={style.TemplateDetailOverview_row}>
            <div className={style.TemplateDetailOverview_rowLabel}>TEMPLATE NAME</div>
            <div className={style.TemplateDetailOverview_rowCell}>{template.name}</div>
          </div>
          <div className={style.TemplateDetailOverview_row}>
            <div className={style.TemplateDetailOverview_rowLabel}>TEMPLATE DESCRIPTION</div>
            <div className={style.TemplateDetailOverview_rowCell}>{template.description}</div>
          </div>
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
                  secondary />
              </div>
              <div className={style.TemplateDetailOverview_actionButtonContainer}>
                <RaisedButton
                  labelText="Preview pdf"
                  secondary />
              </div>
              <div className="clearfix"/>
              {!isReadOnly && <div className={style.TemplateDetailOverview_commitButtonContainer}>
                <RaisedButton
                  labelText="Commit to production"
                  onClick={::this.showCommitToProductionForm}
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
                  const {objectId} = item;
                  this.props.loadVersionHistory(objectId);
                }}
                onSetProductionPressed={() => {}}
                primaryText={(item) => {
                  return <span>{item.commitMessage}</span>;
                }}
                secondaryText={(item) => {
                  const text = moment(item.createdAt).calendar();
                  const viewingSpan = <span className={style.TemplateDetailOverview__isViewingVersion}>(viewing)</span>;

                  return <span>{::this.isCurrentlyViewingOlderVersion(item) && viewingSpan} {text}</span>;
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
