import * as Parse from 'parse';
import { appDispatcher } from './../../appDispatcher';
import { MY_ACCOUNT_ACTION_TYPES } from './../actionTypes.constant';

class MyAccountUpdateAction {
  execute(data) {
    const currentUser = Parse.User.current();
    currentUser.set('firstName', data.firstName);
    currentUser.set('lastName', data.lastName);

    return new Promise((resolve, reject) => {
      currentUser.save().then(() => {
        return currentUser.fetch().then(() => {
          appDispatcher.dispatch(MY_ACCOUNT_ACTION_TYPES.MY_ACCOUNT_UPDATE_SUCCESS);
          return resolve();
        });
      }, (err) => {
        return reject(err);
      });
    });
  }
}

export const myAccountUpdateAction = new MyAccountUpdateAction();