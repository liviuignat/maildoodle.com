import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import {reducer as form} from 'redux-form';

import {reducer as auth} from './auth';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form
});
