import React, {Component, PropTypes} from 'react';
import {analyticsService} from 'client';

export default class GoogleAnalytics extends Component {
  static propTypes = {
    id: PropTypes.string,
    set: PropTypes.object,
    user: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {id, set} = this.props;

    analyticsService.initGoogleAnalytics(id, set);

    this.historyListener = this.context.router.listen((location) => {
      if (!location) {
        return;
      }

      this.pageview(location);
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (!this.historyListener) {
      return;
    }

    this.historyListener();
    this.historyListener = null;
  }

  pageview(location = {}) {
    const path = location.pathname + location.search;
    if (this.latestUrl === path) {
      return;
    }

    this.latestUrl = path;
    setTimeout(() => {
      analyticsService.sendPageview(path, document.title, this.props.user);
    }, 0);
  }

  render() {
    return <span />;
  }
}
