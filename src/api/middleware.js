import co from 'co';
import {getUserBySessionToken, getUserByApiToken} from './modules/user/userRepository';

export function requestAuthToken(req, res, next) {
  const fromCookie = req.cookies.auth_token;
  const fromUrl = req.query.auth_token;
  const authHeader = req.get('Authorization');
  const apiTokenHeader = req.get('x-api-token');
  const fromHeader = authHeader ? authHeader.replace('Bearer ', '') : '';

  req.authToken = fromCookie || fromUrl || fromHeader;
  req.apiToken = apiTokenHeader;

  next();
}

export function userFromAuthToken(req, res, next) {
  co(function*() {
    try {
      const {authToken, apiToken} = req;
      let user = null;

      if (authToken) {
        user = yield getUserFromSession(req.authToken);
      }

      if (apiToken) {
        user = yield getUserFromApiToken(req.apiToken);
      }

      if (user) {
        req.user = getUserResponse(user);
      }

      return next();
    } catch (err) {
      return next();
    }
  });
}

export function requiredAuthenticated(req, res, next) {
  if (!req.user) {
    return res
      .status(401)
      .json('Not authorized');
  }

  return next();
}

function getUserFromSession(sessionToken) {
  return getUserBySessionToken(sessionToken);
}

function getUserFromApiToken(apiToken) {
  return getUserByApiToken(apiToken);
}

function getUserResponse(user) {
  if (!user) {
    return null;
  }

  const response = Object.assign({}, user);

  delete response.password;
  delete response.authToken;

  return response;
}
