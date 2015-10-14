import * as Parse from 'parse';
import { appDispatcher } from './../../appDispatcher';
import { AUTH_ACTION_TYPES } from './../actionTypes.constant';

class LoginAction {
  execute(data: ILoginModel): Promise<any> {
    return new Promise((resolve, reject) => {
      Parse.User.logOut();

      Parse.User.logIn(data.email, data.password, {
        success: (user: any) => {
          appDispatcher.dispatch(AUTH_ACTION_TYPES.LOG_IN_SUCCESS, user);
          return resolve(user);
        },
        error: (user: any, error: any) => {
          return reject(error);
        }
      });
    });
  }
}

export const loginAction = new LoginAction();