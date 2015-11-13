import md5 from 'md5';
import co from 'co';
import {getMongdb, mapId, ObjectID} from './../mongodb';

const CLASS_NAME = 'users';

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
    const db = yield getMongdb();
    const collection = db.collection(CLASS_NAME);

    const objectIdQuery = {
      _id: ObjectID(query.objectId)
    };
    const search = query.objectId ? Object.assign(query, objectIdQuery) : query;

    return yield collection
      .findOne(search)
      .then((item) => mapId(item));
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

    const db = yield getMongdb();
    const collection = db.collection(CLASS_NAME);

    yield collection.ensureIndex({
      email: 1,
      authToken: 1,
      sessionToken: 1
    });

    const result = yield collection.insertOne(newUserAccount);

    if (result.ops && result.ops.length) {
      return mapId(result.ops[0]);
    }
  });
}