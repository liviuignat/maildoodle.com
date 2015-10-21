import * as Parse from 'parse';
import { EventEmitter } from 'events';
import { appDispatcher } from './../../appDispatcher';
import { EVENT_TYPES } from './../eventTypes.constant';
import { CurrentUser } from './../../models';
import { AUTH_ACTION_TYPES, MY_ACCOUNT_ACTION_TYPES, GET_CURRENT_USER } from './../../actions/index';

const getUserFromParseUser = (user) => {
  const attr = user.attributes;
  return new CurrentUser(attr);
};

class CurrentUserStore extends EventEmitter {
  constructor() {
    super();

    this.user = null;
    this.isLoggedIn = false;

    appDispatcher.register(this.onAppDispatch.bind(this));
  }

  initializeClient(parseUser) {
    if (parseUser && parseUser.authenticated()) {
      this.isLoggedIn = true;
      this.user = getUserFromParseUser(parseUser);
    } else {
      this.isLoggedIn = false;
      this.user = null;
    }
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  getUser() {
    return this.user;
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
    switch (data.type) {
    case AUTH_ACTION_TYPES.LOG_IN_SUCCESS:
    case AUTH_ACTION_TYPES.SIGN_UP_SUCCESS:
      this.initializeClient(data.payload);
      this.emit(EVENT_TYPES.AUTH_LOGIN);
      break;

    case AUTH_ACTION_TYPES.LOG_OUT_SUCCESS:
      this.initializeClient(Parse.User.current());
      this.emit(EVENT_TYPES.AUTH_LOGOUT);
      break;

    case AUTH_ACTION_TYPES.RESET_PASSWORD_SUCCESS:
      this.initializeClient(Parse.User.current());
      break;

    case MY_ACCOUNT_ACTION_TYPES.MY_ACCOUNT_UPDATE_SUCCESS:
      this.initializeClient(Parse.User.current());
      this.emit(EVENT_TYPES.CHANGE_EVENT);
      break;

    case GET_CURRENT_USER.GET_CURRENT_USER_SUCCESS:
      this.initializeClient(Parse.User.current());
      this.emit(EVENT_TYPES.CHANGE_EVENT);
      break;

    default:
      break;
    }
  }
}

export const currentUserStore = new CurrentUserStore();
