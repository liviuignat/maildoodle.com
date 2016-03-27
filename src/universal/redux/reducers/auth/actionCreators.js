import md5 from 'md5';
import {currentUserService, analyticsService} from 'client';
import * as actions from './actions';

const ANALYTICS_ENVET_CATEGORY = 'AUTH';

export function isUserLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function loadUserAction() {
  return {
    types: [
      actions.LOAD_CURRENT_USER,
      actions.LOAD_CURRENT_USER_SUCCESS,
      actions.LOAD_CURRENT_USER_FAIL
    ],
    promise: (client) => {
      if (__SERVER__) {
        return client.get('/user/me');
      }
      return Promise.resolve(currentUserService.getCurrentUser());
    }
  };
}

export function loginAction(email, password) {
  const payload = {
    data: {
      email,
      password: md5(password)
    }
  };

  return {
    types: [
      actions.LOGIN,
      actions.LOGIN_SUCCESS,
      actions.LOGIN_FAIL
    ],
    promise: (client) => new Promise((resolve, reject) => {
      client.post('/auth/login', payload).then(user => {
        if (!__SERVER__) {
          currentUserService.setUserCookie(user);
        }

        return client.get('/user/me').then(exitingUser => {
          const {objectId, displayName} = exitingUser;

          analyticsService.sendEvent({
            eventCategory: ANALYTICS_ENVET_CATEGORY,
            eventAction: actions.LOGIN_SUCCESS,
            eventLabel: JSON.stringify({user: {objectId, displayName}})
          });
          return exitingUser;
        });
      })
      .then(user => resolve(user))
      .catch(() => reject('User or password does not exist.'));
    })
  };
}

export function signUpAction(email, password) {
  const payload = {
    data: {
      email,
      password: md5(password)
    }
  };

  return {
    types: [
      actions.SIGN_UP,
      actions.SIGN_UP_SUCCESS,
      actions.SIGN_UP_FAIL
    ],
    promise: (client) => new Promise((resolve, reject) => {
      client.post('/auth/signup', payload).then(user => {
        if (!__SERVER__) {
          currentUserService.setUserCookie(user);
        }

        client.get('/user/me').then(exitingUser => {
          const {objectId, displayName} = exitingUser;

          analyticsService.sendEvent({
            eventCategory: ANALYTICS_ENVET_CATEGORY,
            eventAction: actions.SIGN_UP_SUCCESS,
            eventLabel: JSON.stringify({user: {objectId, displayName}})
          });
          return exitingUser;
        });
      }).then(user => resolve(user))
      .catch(() => reject('Email is already registered.'));
    })
  };
}

export function logoutAction() {
  return {
    types: [
      actions.LOGOUT,
      actions.LOGOUT_SUCCESS,
      actions.LOGOUT_FAIL
    ],
    promise: () => {
      if (__SERVER__) {
        return Promise.resolve();
      }
      return currentUserService.logOut();
    }
  };
}

export function updatePersonalInformationAction(user) {
  return {
    types: [
      actions.UPDATE_CURRENT_USER,
      actions.UPDATE_CURRENT_USER_SUCCESS,
      actions.UPDATE_CURRENT_USER_FAIL
    ],
    promise: (client) => client.put('user/me', {data: user})
  };
}

export function refreshAPIAccessTokenAction(user) {
  return {
    types: [
      actions.REFRESH_API_ACCESS_TOKEN_USER,
      actions.REFRESH_API_ACCESS_TOKEN_USER_SUCCESS,
      actions.REFRESH_API_ACCESS_TOKEN_USER_FAIL
    ],
    promise: (client) => client.put('user/me/apiaccesstoken', {data: user})
  };
}
