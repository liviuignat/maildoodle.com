import * as React from 'react';
import * as Parse from 'parse';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { routes } from './components/routes';
import { currentUserStore } from './stores/index';
import { cookieService } from './services';

import client from 'react-engine/lib/client';

injectTapEventPlugin();
Parse.initialize('HrMPFQFNyOPjq8cR9i67xSyAzAggfJYwTetpDUwB', 'Pm8doOztn0N8iXfNzisX5RrV4r2y1wbbTKHxRoUr');

const render = (user) => {
  currentUserStore.initializeClient(user);

  const options = {
    routes
  };

  client.boot(options, (data) => {
    console.log('booted', data);
  });
};

const initialize = () => {
  const authToken = cookieService.getCookie('auth_token');

  if (authToken) {
    Parse.User.become(authToken).then((user) => {
      render(user);
    }, () => {
      render();
    });
  } else {
    render();
  }
};

window.document.addEventListener('DOMContentLoaded', () => {
  initialize();
});
