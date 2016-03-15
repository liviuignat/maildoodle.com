import forOwn from 'lodash/forOwn';

export function command(...args) {
  if (!window.ga) {
    throw new Error('Google analytics is not initialized');
  }

  return window.ga.apply(window.ga, args);
}

export function send(what, options) {
  return command('send', what, options);
}

export function set(key, value) {
  return command('set', key, value);
}

export function sendPageview(page, title = page, user = null) {
  const payload = {page, title};

  if (user) {
    const userId = user.objectId;
    set('userId', userId);
  }

  return send('pageview', payload);
}

export function initGoogleAnalytics(id, sets = {}) {
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
