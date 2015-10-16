import * as Parse from 'parse';
import { appDispatcher } from './../../appDispatcher';
import { AUTH_ACTION_TYPES } from './../actionTypes.constant';

class LogoutAction {
  execute() {
    Parse.User.logOut();
    appDispatcher.dispatch(AUTH_ACTION_TYPES.LOG_OUT_SUCCESS);
    return Promise.resolve();
  }
}

export const logoutAction = new LogoutAction();