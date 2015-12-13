import md5 from 'md5';
import co from 'co';
import {User, toJson} from './../../mongoose';

export function getUserById(objectId) {
  return getUserByQuery({ objectId });
}

export function getUserByEmail(email) {
  return getUserByQuery({ email });
}

export function getUserByToken(authToken) {
  return getUserByQuery({ authToken });
}

export function getUserBySessionToken(sessionToken) {
  return getUserByQuery({ sessionToken });
}

function getUserByQuery(query) {
  return co(function *() {
    const objectIdQuery = {
      _id: query.objectId
    };
    const search = query.objectId ? Object.assign(query, objectIdQuery) : query;

    var user = yield User.findOne(search);
    return toJson(user);
  });
}

export function createUser(userData) {
  return co(function*() {
    const data = Date.now();
    const authToken = md5(data);
    const sessionToken = md5(Date.now() + 5);

    const newUserAccount = Object.assign(userData, {
      authToken,
      sessionToken,
      verified: false,
      createdAt: new Date()
    });

    var user = yield new User(newUserAccount).save();

    return toJson(user);
  });
}