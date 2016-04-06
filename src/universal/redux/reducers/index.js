import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import {reducer as auth} from './auth';
import {reducer as projects} from './projects';
import {reducer as currentProject} from './currentProject';
import {reducer as currentLayout} from './currentLayout';
import {reducer as currentTemplate} from './currentTemplate';
import {reducer as currentDesigner} from './currentDesigner';

export default combineReducers({
  routing,
  reduxAsyncConnect,
  form,
  auth,
  projects,
  currentProject,
  currentLayout,
  currentTemplate,
  currentDesigner
});
