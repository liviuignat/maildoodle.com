import * as Parse from 'parse';
import { appDispatcher } from './../../appDispatcher';
import { AUTH_ACTION_TYPES } from './../actionTypes.constant';
import { cookieService } from './../../services';

class LoginAction {
  execute(data) {
    return new Promise((resolve, reject) => {
      Parse.User.logIn(data.email, data.password, {
        success: (user) => {
          this.setUserCookie(user);
          appDispatcher.dispatch(AUTH_ACTION_TYPES.LOG_IN_SUCCESS, user);
          return resolve(user);
        },
        error: (user, error) => {
          return reject(error);
        }
      });
    });
  }

  setUserCookie(user) {
    const exdays = 10000;
    const cname = 'auth_token';
    const cvalue = user.attributes.sessionToken;
    const expires = exdays * 24 * 60 * 60 * 1000;

    cookieService.setCookie({
      name: cname,
      value: cvalue,
      expires: expires
    });
  }
}

export const loginAction = new LoginAction();
