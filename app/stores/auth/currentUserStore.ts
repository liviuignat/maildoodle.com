import * as Parse from 'parse';
import { md5 } from 'blueimp-md5';
import { EventEmitter } from 'events';
import { appDispatcher } from './../../appDispatcher';
import { EVENT_TYPES } from './../eventTypes.constant';
import { AUTH_ACTION_TYPES, MY_ACCOUNT_ACTION_TYPES, GET_CURRENT_USER } from './../../actions/index';

const getUserFromParseUser = (user: any): ICurrentUserData => {
  const attr = user.attributes;
  return {
    email: <string>attr.email,
    sessionToken: <string>attr.sessionToken,
    emailVerified: <boolean>attr.emailVerified,
    updatedAt: <Date>attr.updatedAt,
    firstName: <string>attr.firstName,
    lastName: <string>attr.lastName
  };
};

class CurrentUserStore extends EventEmitter implements ICurrentUser {
  private user: ICurrentUserData;
  private isLoggedIn = false;
  private parseUser: any = null;

  constructor() {
    super();
    appDispatcher.register(this.onAppDispatch.bind(this));
  }

  initialize() {
    this.parseUser = Parse.User.current();
    this.isLoggedIn = this.parseUser && this.parseUser.authenticated();

    if (this.isLoggedIn) {
      this.user = getUserFromParseUser(this.parseUser);
    }
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  getUserData(): ICurrentUserData {
    return this.user;
  }

  getEmail(): string {
    if (this.getIsLoggedIn()) {
      return this.getUserData().email;
    }
  }

  getUserPhoto(): string {
    if (this.getIsLoggedIn()) {
      const emailMd5 = md5(this.getEmail());
      return `http://www.gravatar.com/avatar/${emailMd5}.jpg?s=200`;
    }
  }

  getDisplayName(): string {
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

  addLoginListener(callback: () => void) {
    this.on(EVENT_TYPES.AUTH_LOGIN, callback);
    return this;
  }
  removeLoginListener(callback: () => void) {
    this.on(EVENT_TYPES.AUTH_LOGIN, callback);
    return this;
  }
  addChangeListener(callback: () => void) {
    this.on(EVENT_TYPES.CHANGE_EVENT, callback);
    return this;
  }
  removeChangeListener(callback: () => void) {
    this.on(EVENT_TYPES.CHANGE_EVENT, callback);
    return this;
  }
  addLogoutListener(callback: () => void) {
    this.on(EVENT_TYPES.AUTH_LOGOUT, callback);
    return this;
  }
  removeLLogoutListener(callback: () => void) {
    this.on(EVENT_TYPES.AUTH_LOGOUT, callback);
    return this;
  }

  onAppDispatch(data: IDispatcherPayload<any>) {
    this.initialize();

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