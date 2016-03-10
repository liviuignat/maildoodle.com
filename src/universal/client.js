import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {ReduxAsyncConnect} from 'redux-async-connect';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import getRoutes from './routes';

injectTapEventPlugin();

const client = new ApiClient();
// const history = useScroll(() => browserHistory)();
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);
const scrollHistory = useScroll(() => history)();
const dest = document.getElementById('content');

const component = (
  <Router
    render={(props) => <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />}
    history={scrollHistory}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
if (__DEVTOOLS__) {
  const { DevTools } = require('./containers');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
