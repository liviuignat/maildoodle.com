import {combineReducers} from 'redux';
import {routeReducer} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import {reducer as appLoading} from './appLoading';
import {reducer as auth} from './auth';
import {reducer as projects} from './projects';
import {reducer as currentProject} from './currentProject';
import {reducer as currentLayout} from './currentLayout';
import {reducer as currentTemplate} from './currentTemplate';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  form,
  appLoading,
  auth,
  projects,
  currentProject,
  currentLayout,
  currentTemplate
});
