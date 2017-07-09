import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import {asyncConnect} from 'redux-async-connect';
import {Paper, Breadcrumbs} from 'universal/components';
import {
  getLayoutDetailsAction,
  updateLayoutDetailsAction
} from 'universal/redux/reducers/currentLayout/actionCreators';
import LayoutDetailForm, {LAYOUT_DETAIL_FORM} from './layout-detail-forms/LayoutDetailForm';

@asyncConnect([{
  promise: ({params: {projectId, layoutId}, store: {dispatch}}) =>
    dispatch(getLayoutDetailsAction(projectId, layoutId))
}])
@connect(
  state => ({
    currentLayout: state.currentLayout
  }), {
    initialize,
    getLayoutDetailsAction,
    updateLayoutDetailsAction
  })
export default class LayoutDetailPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    currentLayout: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    getLayoutDetailsAction: PropTypes.func.isRequired,
    updateLayoutDetailsAction: PropTypes.func.isRequired
  };

  componentWillMount() {
    const {
      currentLayout: {
        layout: {
          name, value
        }
      }
    } = this.props;

    this.props.initialize(LAYOUT_DETAIL_FORM, {name, value});
  }

  handleLayoutSubmit(layout) {
    const {projectId, layoutId} = this.props.params;
    this.props.updateLayoutDetailsAction(projectId, layoutId, layout);
  }

  render() {
    const style = require('./LayoutDetailPage.scss');
    const {
      params: {projectId},
      currentLayout: {
        isUpdatingLayout,
        updateLayoutError
      }
    } = this.props;

    return (
      <div>
        <Helmet title={`maildoodle - Layout Detail`} />
        <Breadcrumbs style={{padding: '0 0 16px 0'}} links={[{
          text: `projects`,
          href: `/app/projects`
        }, {
          text: `project details`,
          href: `/app/projects/${projectId}`
        }, {
          text: `layout details`
        }]}/>

        <Paper className={style.LayoutDetailPage}>
          <LayoutDetailForm
            onSubmit={::this.handleLayoutSubmit}
            isUpdatingLayout={isUpdatingLayout}
            updateLayoutError={updateLayoutError} />
        </Paper>
      </div>
    );
  }
}
