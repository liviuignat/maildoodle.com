import { Parse } from 'node-parse-api';
import config from './../config';

const parse = new Parse(config.parse.options);

export function requestAuthToken(req, res, next) {
  const fromCookie = req.cookies.auth_token;
  const fromUrl = req.query.auth_token;
  const authHeader = req.get('Authorization');
  const fromHeader = authHeader ? authHeader.replace('Bearer ', '') : '';

  req.authToken = fromCookie || fromUrl || fromHeader;

  next();
}

export function userFromParse(req, res, next) {
  if (req.authToken) {
    getUserFromSession(req.authToken).then((user) => {
      req.user = getUserFromParse(user);
    }).catch(() => {
    }).then(() => {
      return next();
    });
  } else {
    return next();
  }
}

export function requiredAuthenticated(req, res, next) {
  if(!req.user) {
    return res
      .status(401)
      .json('Not authorized');
  }

  return next();
}

function getUserFromSession(sessionToken) {
  return new Promise((resolve, reject) => {
    parse.me(sessionToken, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
};

function getUserFromParse(parseUser) {
  if (!parseUser) {
    return null;
  }
  return {
    email: parseUser.email,
    emailVerified: parseUser.emailVerified,
    updatedAt: parseUser.updatedAt,
    firstName: parseUser.firstName,
    lastName: parseUser.lastName
  };
}