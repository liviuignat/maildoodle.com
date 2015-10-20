import * as React from 'react';
import * as Parse from 'parse';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { routes } from './components/routes';
import { currentUserStore } from './stores/index';
import { getCurrentUserAction } from './actions/index';

import client from 'react-engine/lib/client';

injectTapEventPlugin();
Parse.initialize('HrMPFQFNyOPjq8cR9i67xSyAzAggfJYwTetpDUwB', 'Pm8doOztn0N8iXfNzisX5RrV4r2y1wbbTKHxRoUr');
currentUserStore.initializeClient();

const render = () => {
  const options = {
    routes
  };

  client.boot(options, (data) => {
    console.log('booted', data);
  });
};

window.document.addEventListener('DOMContentLoaded', () => {
  // if (currentUserStore.getIsLoggedIn()) {
  //   getCurrentUserAction.execute().then(() => {
  //     render();
  //   });
  // } else {
  //   render();
  // }
  render();
});
