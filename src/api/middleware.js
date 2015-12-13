import {getUserBySessionToken} from './modules/user/userRepository';
import config from './../config';

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
      req.user = getUserResponse(user);
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
  return getUserBySessionToken(sessionToken);
};

function getUserResponse(user) {
  if (!user) {
    return null;
  }

  const response = Object.assign({},user);

  delete response.password;
  delete response.authToken;

  return response;
}