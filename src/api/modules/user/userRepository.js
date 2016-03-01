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

    if (search.objectId) {
      delete search.objectId;
    }

    const user = yield User.findOne(search);
    return toJson(user);
  });
}

export function updateUserPersonalData(userId, updatedUserData) {
  const {firstName, lastName, companyName} = updatedUserData;

  return co(function*() {
    return yield User.update({
      _id: userId
    }, {firstName, lastName, companyName});
  });
}

export function updateApiAccessToken(userId) {
  return co(function*() {
    const newApiAccessToken = md5(Date.now() + 10);

    return yield User.update({
      _id: userId
    }, {
      apiAccessToken: newApiAccessToken
    });
  });
}

export function createUser(userData) {
  return co(function*() {
    const data = Date.now();
    const authToken = md5(data);
    const sessionToken = md5(Date.now() + 5);
    const apiAccessToken = md5(Date.now() + 10);

    const newUserAccount = Object.assign(userData, {
      apiAccessToken,
      authToken,
      sessionToken,
      verified: false,
      createdAt: new Date()
    });

    const user = yield new User(newUserAccount).save();

    return toJson(user);
  });
}
