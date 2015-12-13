import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  getTemplateDetailByIdAction
} from './../../../redux/reducers/currentTemplate';

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
      <div className={style.TemplateDetailPage}>
        {template.name}
      </div>
    );
  }
}
