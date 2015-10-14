import * as Parse from 'parse';
import { appDispatcher } from './../../appDispatcher';
import { AUTH_ACTION_TYPES } from './../actionTypes.constant';

class CreateUserAction {
  execute(data: ICreateUserModel) {
    return new Promise((resolve, reject) => {
      const newUser = new Parse.User();
      newUser.set('username', data.email);
      newUser.set('password', data.password);
      newUser.set('email', data.email);

      newUser.signUp(null, {
        success: (user: any) => {
          appDispatcher.dispatch(AUTH_ACTION_TYPES.SIGN_UP_SUCCESS);
          return resolve(user);
        },
        error: (user: any, error: any) => {
          return reject(error);
        }
      });
    });
  }
}

export const createUserAction = new CreateUserAction();