import { cookieService } from './../cookieService/cookieService';
import { getItem, setItem, removeItem } from './../storageService/storageService';
import ApiClient from './../../universal/helpers/ApiClient';

const COOKIE_NAME = 'auth_token';
const STORAGE_ITEM_NAME = 'email-templates/current_user';

export function getCurrentUser() {
  const cookie = cookieService.getCookie(COOKIE_NAME);
  if (!cookie) {
    return logOut();
  }

  const storageUser = getItem(STORAGE_ITEM_NAME);

  if (!storageUser) {
    const client = new ApiClient();
    return client.get('/user/me').then((user) => {
      setItem(STORAGE_ITEM_NAME, user);
      return user;
    });
  }

  return Promise.resolve(storageUser);
}

export function getCurrentAuthSession() {
  return getCurrentUser().then((user) => {
    if (!user) {
      return null;
    }
    return user.sessionToken;
  });
}

export function logIn(email, password) {
  const client = new ApiClient();

  return new Promise((resolve, reject) => {
    client.post('/auth/login', {
      data: { email, password }
    }).then((user) => {
      setUserInCache(user);
      return resolve(user);
    }, () => {
      return reject('Login parameters are invalid');
    });
  });
}

export function logOut() {
  cookieService.deleteCookie(COOKIE_NAME);
  removeItem(STORAGE_ITEM_NAME);
  return Promise.resolve();
}

export function setUserInCache(user) {
  setUserCookie(user);
  setItem(STORAGE_ITEM_NAME, user);
}

export function setUserCookie(user) {
  const exdays = 10000;
  const cname = COOKIE_NAME;
  const cvalue = user.sessionToken;
  const expires = exdays * 24 * 60 * 60 * 1000;

  cookieService.setCookie({
    name: cname,
    value: cvalue,
    expires: expires
  });
}
