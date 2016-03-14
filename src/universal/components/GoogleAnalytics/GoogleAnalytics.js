import React, {Component, PropTypes} from 'react';
import forOwn from 'lodash/forOwn';

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
    if (__DEVELOPMENT__) {
      return;
    }

    initGoogleAnalytics(this.props.id, this.props.set);

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
      sendPageview(path, document.title, this.props.user);
    }, 0);
  }

  render() {
    return (<span>Google Analytics</span>);
  }
}

function initGoogleAnalytics(id, sets = {}) {
  if (window.ga || !id) {
    return;
  }

  window.ga = window.ga || function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date; // eslint-disable-line

  (function loadScript() {
    const gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    gads.src = '//www.google-analytics.com/analytics.js';

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(gads);
  })();

  window.ga('create', id, 'auto');

  forOwn(sets, (value, key) => {
    set(key, value);
  });
}

function command(...args) {
  if (!window.ga) {
    throw new Error('Google analytics is not initialized');
  }

  return window.ga.apply(window.ga, args);
}

function send(what, options) {
  return command('send', what, options);
}

function set(key, value) {
  return command('set', key, value);
}

function sendPageview(page, title = page, user = null) {
  const payload = {page, title};

  if (user) {
    const userId = user.objectId;
    set('userId', userId);
  }

  return send('pageview', payload);
    return (<span></span>);
}
