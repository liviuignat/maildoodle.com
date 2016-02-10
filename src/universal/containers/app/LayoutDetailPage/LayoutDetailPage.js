import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize as initializeForm} from 'redux-form';
import { pushState } from 'redux-router';
import {
  getLayoutDetailsAction
} from './../../../redux/reducers/currentLayout';

@connect(
  state => ({
    projectId: state.router.params.projectId,
    layoutId: state.router.params.layoutId,
    layout: state.currentLayout.layout
  }), {
    pushState,
    initializeForm,
    getLayoutDetailsAction
  })
export default class LayoutDetailPage extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    layoutId: PropTypes.string.isRequired,
    layout: PropTypes.object.isRequired,
    initializeForm: PropTypes.func.isRequired,
    getLayoutDetailsAction: PropTypes.func.isRequired
  };

  static fetchData(getState, dispatch, location, params) {
    const promises = [];
    promises.push(dispatch(getLayoutDetailsAction(params.projectId, params.layoutId)));
    return Promise.all(promises);
  }

  render() {
    const { layout } = this.props;

    return (
      <div>
        {layout.name}
      </div>
    );
  }
}
