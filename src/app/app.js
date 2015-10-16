import * as React from 'react';
import * as Parse from 'parse';
import * as Router from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { routes } from './components/routes';
import { currentUserStore } from './stores/index';
import { getCurrentUserAction } from './actions/index';

import client from 'react-engine/lib/client';

injectTapEventPlugin();
Parse.initialize('HrMPFQFNyOPjq8cR9i67xSyAzAggfJYwTetpDUwB', 'Pm8doOztn0N8iXfNzisX5RrV4r2y1wbbTKHxRoUr');
currentUserStore.initialize();

// const appNode = window.document.getElementById('app');
// const render = () => {
//   Router.run(routes, Router.HistoryLocation, (Handler) => {
//     console.log('routes initialized');
//     React.render(<Handler />, appNode);
//   });
// };

// if (currentUserStore.getIsLoggedIn()) {
//   getCurrentUserAction.execute().then(() => {
//     render();
//   });
// } else {
//   render();
// }

const options = { routes };
window.document.addEventListener('DOMContentLoaded', function onLoad() {
  client.boot(options, function onBoot(data) {
    console.log('booted');
  });
});