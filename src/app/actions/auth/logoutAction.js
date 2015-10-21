import * as Parse from 'parse';
import { appDispatcher } from './../../appDispatcher';
import { AUTH_ACTION_TYPES } from './../actionTypes.constant';
import { cookieService } from './../../services';

class LogoutAction {
  execute() {
    Parse.User.logOut();
    cookieService.deleteCookie('auto_token');
    appDispatcher.dispatch(AUTH_ACTION_TYPES.LOG_OUT_SUCCESS);
    return Promise.resolve();
  }
}

export const logoutAction = new LogoutAction();
