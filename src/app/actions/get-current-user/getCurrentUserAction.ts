import * as Parse from 'parse';
import { appDispatcher } from './../../appDispatcher';
import { GET_CURRENT_USER } from './../actionTypes.constant';

class GetCurrentUserAction {
  execute() {
    const currentUser = Parse.User.current();

    return new Promise((resolve, reject) => {
     currentUser.fetch().then(() => {
        appDispatcher.dispatch(GET_CURRENT_USER.GET_CURRENT_USER_SUCCESS);
        return resolve();
      }, (err: any) => {
        return reject(err);
      });
    });
  }
}

export const getCurrentUserAction = new GetCurrentUserAction();