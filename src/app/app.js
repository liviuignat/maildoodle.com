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

  client.boot(options, () => {
  });
};

const initialize = () => {
  const cookieName = 'auth_token';
  const authToken = cookieService.getCookie(cookieName);

  if (authToken) {
    Parse.User.become(authToken).then((user) => {
      render(user);
    }, () => {
      cookieService.deleteCookie(cookieName);
      render();
    });
  } else {
    render();
  }
};

window.document.addEventListener('DOMContentLoaded', () => {
  initialize();
});
