import {currentUserService, analyticsService} from 'client';
import * as actions from './actions';

const ANALYTICS_ENVET_CATEGORY = 'AUTH';

export function isUserLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function loadUserAction() {
  return {
    types: [actions.LOAD_CURRENT_USER, actions.LOAD_CURRENT_USER_SUCCESS, actions.LOAD_CURRENT_USER_FAIL],
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

      return currentUserService.logIn(email, password)
        .then(user => {
          const {objectId, displayName} = user;
          analyticsService.sendEvent({
            eventCategory: ANALYTICS_ENVET_CATEGORY,
            eventAction: actions.LOGIN_SUCCESS,
            eventLabel: JSON.stringify({user: {objectId, displayName}})
          });
          return user;
        });
    }
  };
}

export function signUpAction(email, password) {
  return {
    types: [actions.SIGN_UP, actions.SIGN_UP_SUCCESS, actions.SIGN_UP_FAIL],
    promise: (client) => {
      return client.post('/auth/signup', {
        data: { email, password }
      }).then((user) => {
        if (!__SERVER__) {
          currentUserService.setUserInCache(user);
        }

        return client.get('/user/me')
          .then(exitingUser => {
            const {objectId, displayName} = exitingUser;

            analyticsService.sendEvent({
              eventCategory: ANALYTICS_ENVET_CATEGORY,
              eventAction: actions.LOGIN_SUCCESS,
              eventLabel: JSON.stringify({user: {objectId, displayName}})
            });
            return exitingUser;
          });
      });
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
