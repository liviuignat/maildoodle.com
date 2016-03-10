import React, { Component, PropTypes } from 'react';
import { GenericList, DialogForm } from './../../../components';
import AddLayoutForm, {ADD_LAYOUT_FORM_NAME} from './project-detail-forms/AddLayoutForm';

export default class LayoutsList extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    layouts: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    startSubmit: PropTypes.func.isRequired,
    insertLayoutAction: PropTypes.func.isRequired,
    deleteLayoutAction: PropTypes.func.isRequired
  };

  navigateToDetails(layout) {
    const url = `/app/projects/${this.props.project.objectId}/layouts/${layout.objectId}`;
    this.props.pushState(url);
  }

  openAddLayoutDialog() {
    this.props.initializeForm(ADD_LAYOUT_FORM_NAME, {});
    this.refs.addLayoutDialog.show();
  }

  startSubmitAddLayout() {
    this.props.startSubmit(ADD_LAYOUT_FORM_NAME);
  }

  handleAddLayoutSubmit(data) {
    this.refs.addLayoutDialog.dismiss();
    this.props.insertLayoutAction(this.props.project.objectId, data);
  }

  handleDeleteLayoutSubmit(layout) {
    this.props.deleteLayoutAction(this.props.project.objectId, layout);
  }

  render() {
    const {layouts} = this.props;
    return (
      <div>
        <GenericList subheader="layouts"
          items={layouts}
          onAddPressed={() => {::this.openAddLayoutDialog();}}
          onEditPressed={(item) => {::this.navigateToDetails(item);}}
          onDeletePressed={(item) => {::this.handleDeleteLayoutSubmit(item);}}
          onRowClick={(item) => {::this.navigateToDetails(item);}}
          primaryText={(item) => item.name}
          secondaryText={(item) => item.value} />

        <DialogForm
          ref="addLayoutDialog"
          title="Add new layout"
          startSubmit={::this.startSubmitAddLayout}
          form={<AddLayoutForm onSubmit={::this.handleAddLayoutSubmit}/>} />
      </div>
    );
  }
}
