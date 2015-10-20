import * as Parse from 'parse';
import { md5 } from 'blueimp-md5';
import { EventEmitter } from 'events';
import { appDispatcher } from './../../appDispatcher';
import { EVENT_TYPES } from './../eventTypes.constant';
import { AUTH_ACTION_TYPES, MY_ACCOUNT_ACTION_TYPES, GET_CURRENT_USER } from './../../actions/index';

const getUserFromParseUser = (user) => {
  const attr = user.attributes;
  return {
    email: attr.email,
    sessionToken: attr.sessionToken,
    emailVerified: attr.emailVerified,
    updatedAt: attr.updatedAt,
    firstName: attr.firstName,
    lastName: attr.lastName
  };
};

class CurrentUserStore extends EventEmitter {
  constructor() {
    super();

    this.user = null;
    this.isLoggedIn = false;
    this.parseUser = null;

    appDispatcher.register(this.onAppDispatch.bind(this));
  }

  initializeClient() {
    this.parseUser = Parse.User.current();

    if (this.parseUser && this.parseUser.authenticated()) {
      this.isLoggedIn = true;
    }

    if (this.isLoggedIn) {
      this.user = getUserFromParseUser(this.parseUser);
    }
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  getUserData() {
    return this.user;
  }

  getEmail() {
    if (this.getIsLoggedIn()) {
      return this.getUserData().email;
    }
  }

  getUserPhoto() {
    if (this.getIsLoggedIn()) {
      const emailMd5 = md5(this.getEmail());
      return `http://www.gravatar.com/avatar/${emailMd5}.jpg?s=200`;
    }
  }

  getDisplayName() {
    if (this.isLoggedIn) {
      const user = this.getUserData();
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
  }

  addLoginListener(callback) {
    this.on(EVENT_TYPES.AUTH_LOGIN, callback);
    return this;
  }
  removeLoginListener(callback) {
    this.on(EVENT_TYPES.AUTH_LOGIN, callback);
    return this;
  }
  addChangeListener(callback) {
    this.on(EVENT_TYPES.CHANGE_EVENT, callback);
    return this;
  }
  removeChangeListener(callback) {
    this.on(EVENT_TYPES.CHANGE_EVENT, callback);
    return this;
  }
  addLogoutListener(callback) {
    this.on(EVENT_TYPES.AUTH_LOGOUT, callback);
    return this;
  }
  removeLLogoutListener(callback) {
    this.on(EVENT_TYPES.AUTH_LOGOUT, callback);
    return this;
  }

  onAppDispatch(data) {
    this.initializeClient();

    switch (data.type) {
    case AUTH_ACTION_TYPES.LOG_IN_SUCCESS:
    case AUTH_ACTION_TYPES.SIGN_UP_SUCCESS:
      this.emit(EVENT_TYPES.AUTH_LOGIN);
      break;

    case AUTH_ACTION_TYPES.LOG_OUT_SUCCESS:
      this.emit(EVENT_TYPES.AUTH_LOGOUT);
      break;

    case AUTH_ACTION_TYPES.RESET_PASSWORD_SUCCESS:
      break;

    case MY_ACCOUNT_ACTION_TYPES.MY_ACCOUNT_UPDATE_SUCCESS:
      this.emit(EVENT_TYPES.CHANGE_EVENT);
      break;

    case GET_CURRENT_USER.GET_CURRENT_USER_SUCCESS:
      this.emit(EVENT_TYPES.CHANGE_EVENT);
      break;

    default:
      break;
    }
  }
}

export const currentUserStore = new CurrentUserStore();
