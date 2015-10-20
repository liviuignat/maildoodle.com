import config from 'config';
import { Parse } from 'node-parse-api';

const app = new Parse(config.parse.options);

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    app.loginUser(username, password, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
};

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
  req.authToken = req.session.authToken;
  next();
};

export const userFromParseMiddleware = (req, res, next) => {

  if (req.authToken) {
    getUserFromSession(req.authToken).then((user) => {
      req.user = user;
    }).catch(() => {
    }).then(() => {
      next();
    });
  } else {
    login('liviu@ignat.email', 'test123').then((response) => {
      req.session.authToken = response.sessionToken;
      req.authToken = response.sessionToken;

      return getUserFromSession(req.authToken).then((user) => {
        req.user = user;
      });
    }).catch(() => {
    }).then(() => {
      next();
    });
  }
};
