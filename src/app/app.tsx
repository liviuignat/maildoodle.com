import * as React from 'react';
import * as Parse from 'parse';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRouter from './components/AppRouter';
import { currentUserStore } from './stores/index';
import { getCurrentUserAction } from './actions/index';

const appNode = window.document.getElementById('app');
const render = () => {
  React.render(<AppRouter />, appNode);
};

injectTapEventPlugin();
Parse.initialize('HrMPFQFNyOPjq8cR9i67xSyAzAggfJYwTetpDUwB', 'Pm8doOztn0N8iXfNzisX5RrV4r2y1wbbTKHxRoUr');

currentUserStore.initialize();
if (currentUserStore.getIsLoggedIn()) {
  getCurrentUserAction.execute().then(() => {
    render();
  });
} else {
  render();
}