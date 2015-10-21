import config from 'config';
import { Parse } from 'node-parse-api';
import { CurrentUser } from './../../models';

const app = new Parse(config.parse.options);

const getUserFromSession = (sessionToken) => {
  return new Promise((resolve, reject) => {
    app.me(sessionToken, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
};

export const requestAuthTokenMiddleware = (req, res, next) => {
  const fromCookie = req.cookies.auth_token;
  const fromUrl = req.query.auth_token;
  const authHeader = req.get('Authorization');
  const fromHeader = authHeader ? authHeader.replace('Bearer ', '') : '';

  req.authToken = fromCookie || fromUrl || fromHeader;

  next();
};

export const userFromParseMiddleware = (req, res, next) => {

  if (req.authToken) {
    getUserFromSession(req.authToken).then((user) => {
      req.user = new CurrentUser(user);
    }).catch(() => {
    }).then(() => {
      return next();
    });
  } else {
    return next();
  }
};
