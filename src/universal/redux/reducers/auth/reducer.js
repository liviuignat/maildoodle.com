import md5 from 'md5';
import * as actions from './actions';

const initialState = {
  loaded: false
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.LOAD:
      return {
        ...state,
        loading: true
      };
    case actions.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: getFullUser(action.result)
      };
    case actions.LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case actions.LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: getFullUser(action.result)
      };
    case actions.LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case actions.LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case actions.LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

function getFullUser(user) {
  if (!user) {
    return null;
  }

  const extendedUser = Object.assign({}, user, {
    displayName: getDisplayName(user),
    profilePhoto: getUserPhoto(user)
  });

  return extendedUser;
}

function getDisplayName(user) {
  if (!user) {
    return '';
  }

  let displayName = user.username;

  if (user.firstName && user.lastName) {
    displayName = `${user.firstName} ${user.lastName}`;
  } else if (user.firstName) {
    displayName = user.firstName;
  } else if (user.lastName) {
    displayName = user.lastName;
  }

  return displayName;
}

function getUserPhoto(user) {
  if (!user) {
    return '';
  }

  const emailMd5 = md5(user.email);
  return `http://www.gravatar.com/avatar/${emailMd5}.jpg?s=200`;
}

