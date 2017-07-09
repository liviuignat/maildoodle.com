import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import {reducer as auth} from './auth/reducer';
import {reducer as projects} from './projects/reducer';
import {reducer as currentProject} from './currentProject/reducer';
import {reducer as currentLayout} from './currentLayout/reducer';
import {reducer as currentTemplate} from './currentTemplate/reducer';

export default combineReducers({
  routing,
  reduxAsyncConnect,
  form,
  auth,
  projects,
  currentProject,
  currentLayout,
  currentTemplate
});
