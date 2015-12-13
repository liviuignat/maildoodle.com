import React, { Component, PropTypes } from 'react';
import { GenericList, DialogForm } from './../../../components';
import AddTemplateForm, {ADD_TEMPLATE_FORM_NAME} from './project-detail-forms/AddTemplateForm';

export default class TemplatesList extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    templates: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    startSubmit: PropTypes.func.isRequired,
    insertTemplateAction: PropTypes.func.isRequired,
    updateTemplateAction: PropTypes.func.isRequired,
    deleteTemplateAction: PropTypes.func.isRequired
  };

  navigateToDetails(template) {
    const url = `/app/projects/${this.props.project.objectId}/template/${template.objectId}`;
    this.props.pushState(null, url);
  }

  openAddTemplateDialog() {
    this.props.initializeForm(ADD_TEMPLATE_FORM_NAME, {});
    this.refs.addTemplateDialog.show();
  }

  startSubmitAddTemplate() {
    this.props.startSubmit(ADD_TEMPLATE_FORM_NAME);
  }

  openEditTemplateDialog(template) {
    this.props.initializeForm(ADD_TEMPLATE_FORM_NAME, template);
    this.refs.editTemplateDialog.show();
  }

  startSubmitEditTemplate() {
    this.props.startSubmit(ADD_TEMPLATE_FORM_NAME);
  }

  handleAddTemplateSubmit(data) {
    this.refs.addTemplateDialog.dismiss();
    this.props.insertTemplateAction(this.props.project.objectId, data);
  }

  handleEditTemplateSubmit(data) {
    this.refs.editTemplateDialog.dismiss();
    this.props.updateTemplateAction(this.props.project.objectId, data);
  }

  handleDeleteTemplateSubmit(template) {
    this.props.deleteTemplateAction(this.props.project.objectId, template);
  }

  render() {
    const {templates} = this.props;
    return (
      <div>
        <GenericList subheader="templates"
          items={templates}
          onAddPressed={() => {::this.openAddTemplateDialog();}}
          onEditPressed={(item) => {::this.openEditTemplateDialog(item);}}
          onDeletePressed={(item) => {::this.handleDeleteTemplateSubmit(item);}}
          onRowClick={(item) => {::this.navigateToDetails(item);}}
          primaryText={(item) => item.name}
          secondaryText={(item) => item.description} />

        <DialogForm
          ref="addTemplateDialog"
          title="Add new template"
          startSubmit={::this.startSubmitAddTemplate}
          form={<AddTemplateForm onSubmit={::this.handleAddTemplateSubmit}/>} />

        <DialogForm
          ref="editTemplateDialog"
          title="Add new template"
          startSubmit={::this.startSubmitEditTemplate}
          form={<AddTemplateForm onSubmit={::this.handleEditTemplateSubmit}/>} />
      </div>
    );
  }
}
