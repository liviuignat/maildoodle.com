import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import { pushState } from 'redux-router';
import {Paper} from './../../../components';
import {
  getLayoutDetailsAction,
  updateLayoutDetailsAction
} from './../../../redux/reducers/currentLayout';
import LayoutDetailForm, {LAYOUT_DETAIL_FORM} from './layout-detail-forms/LayoutDetailForm';

@connect(
  state => ({
    projectId: state.router.params.projectId,
    layoutId: state.router.params.layoutId,
    currentLayout: state.currentLayout
  }), {
    pushState,
    initialize,
    getLayoutDetailsAction,
    updateLayoutDetailsAction
  })
export default class LayoutDetailPage extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    layoutId: PropTypes.string.isRequired,
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

  static fetchData(getState, dispatch, location, params) {
    const promises = [];
    promises.push(dispatch(getLayoutDetailsAction(params.projectId, params.layoutId)));
    return Promise.all(promises);
  }

  handleLayoutSubmit(layout) {
    const {projectId, layoutId} = this.props;
    this.props.updateLayoutDetailsAction(projectId, layoutId, layout);
  }

  render() {
    const style = require('./LayoutDetailPage.scss');
    const {
      currentLayout: {
        isUpdatingLayout,
        updateLayoutError
      }
    } = this.props;

    return (
      <div>
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
