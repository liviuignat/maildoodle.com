import md5 from 'md5';
import * as actions from './actions';

const initialState = {
  loaded: false,
  isUpdatingUser: false
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.LOAD_CURRENT_USER:
      return {
        ...state,
        loading: true
      };
    case actions.LOAD_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: getFullUser(action.result)
      };
    case actions.LOAD_CURRENT_USER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };

    case actions.SIGN_UP:
      return {
        ...state,
        signingUp: true,
        signUpError: '',
      };

    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        signUpError: '',
        user: getFullUser(action.result)
      };

    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        signingUp: false,
        signUpError: action.error
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

    case actions.UPDATE_CURRENT_USER:
      return {
        ...state,
        isUpdatingUser: true,
        updateUserError: ''
      };

    case actions.UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isUpdatingUser: false,
        updateUserError: '',
        user: Object.assign({}, getFullUser(action.result))
      };

    case actions.UPDATE_CURRENT_USER_FAIL:
      return {
        ...state,
        isUpdatingUser: false,
        updateUserError: action.error
      };

    case actions.REFRESH_API_ACCESS_TOKEN_USER:
      return {
        ...state,
        isRefreshingAPIAccessToken: true,
        refreshAPIAccessTokenError: ''
      };

    case actions.REFRESH_API_ACCESS_TOKEN_USER_FAIL:
      return {
        ...state,
        isRefreshingAPIAccessToken: false,
        refreshAPIAccessTokenError: action.error
      };

    case actions.REFRESH_API_ACCESS_TOKEN_USER_SUCCESS:
      return {
        ...state,
        isRefreshingAPIAccessToken: false,
        refreshAPIAccessTokenError: '',
        user: Object.assign(state.user, {
          apiAccessToken: action.result.apiAccessToken
        })
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

  let displayName = user.email;

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
