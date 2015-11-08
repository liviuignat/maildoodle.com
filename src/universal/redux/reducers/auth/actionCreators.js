import { currentUserService } from './../../../../client';
import * as actions from './actions';

export function isUserLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function loadUserAction() {
  return {
    types: [actions.LOAD, actions.LOAD_SUCCESS, actions.LOAD_FAIL],
    promise: (client) => {
      if (__SERVER__) {
        return client.get('/user/me');
      }

      return Promise.resolve(currentUserService.getCurrentUser());
    }
  };
}

export function loginAction(email, password) {
  return {
    types: [actions.LOGIN, actions.LOGIN_SUCCESS, actions.LOGIN_FAIL],
    promise: (client) => {
      if (__SERVER__) {
        return client.post('/auth/login', {
          data: { email, password }
        });
      }
      return currentUserService.logIn(email, password);
    }
  };
}

export function logoutAction() {
  return {
    types: [actions.LOGOUT, actions.LOGOUT_SUCCESS, actions.LOGOUT_FAIL],
    promise: () => {
      if (__SERVER__) {
        return Promise.resolve();
      }

      return currentUserService.logOut();
    }
  };
}
