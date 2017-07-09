import * as cookieService from './../cookieService/cookieService';
import ApiClient from './../../universal/helpers/ApiClient';

const COOKIE_NAME = 'auth_token';

export function getCurrentUser() {
  const cookie = cookieService.getCookie(COOKIE_NAME);
  if (!cookie) {
    return logOut();
  }
  return Promise.resolve(getUserFromStore());
}

export function getCurrentAuthSession() {
  return getCurrentUser().then((user) => {
    if (!user) {
      return null;
    }
    return user.authToken;
  });
}

export function logIn(email, password) {
  const client = new ApiClient();

  return new Promise((resolve, reject) => {
    client.post('/auth/login', {
      data: {email, password}
    }).then((user) => {
      setUserCookie(user);
      return resolve(user);
    }, () => {
      return reject('Login parameters are invalid');
    });
  });
}

export function logOut() {
  removeUserCookie();
  return Promise.resolve();
}

export function removeUserCookie() {
  cookieService.deleteCookie(COOKIE_NAME);
}

export function setUserCookie(user) {
  const exdays = 10000;
  const cname = COOKIE_NAME;
  const cvalue = user.authToken;
  const expires = exdays * 24 * 60 * 60 * 1000;

  cookieService.setCookie({
    name: cname,
    value: cvalue,
    expires: expires
  });
}

function getStore() {
  return window.__data;
}

function getUserFromStore() {
  const store = getStore();
  return store && store.auth && store.auth.user;
}
