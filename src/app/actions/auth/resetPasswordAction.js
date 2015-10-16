import * as Parse from 'parse';
import { appDispatcher } from './../../appDispatcher';
import { AUTH_ACTION_TYPES } from './../actionTypes.constant';

class ResetPasswordAction {
  execute(email) {
    return new Promise((resolve, reject) => {
      Parse.User.requestPasswordReset(email, {
        success: () => {
          appDispatcher.dispatch(AUTH_ACTION_TYPES.RESET_PASSWORD_SUCCESS);
          return resolve();
        },
        error: (error) => {
          return reject(error);
        }
      });
    });
  }
}

export const resetPasswordAction = new ResetPasswordAction();