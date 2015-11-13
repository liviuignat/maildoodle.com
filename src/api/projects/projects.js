import co from 'co';
import {ObjectID, getMongdb, mapId} from './../mongodb';

const CLASS_NAME = 'projects';

export function getProjects(userId) {
  return co(function*() {
    const db = yield getMongdb();
    const collection = db.collection(CLASS_NAME);

    return yield collection
      .find({ userId })
      .toArray()
      .then((results) => results.map((item) => mapId(item)));
  });
}

export function getProjectById(userId, projectId) {
  return co(function*() {
    const db = yield getMongdb();
    const collection = db.collection(CLASS_NAME);

    return yield collection
      .findOne({ _id: ObjectID(projectId), userId })
      .then((item) => mapId(item));
  });
}

export function insertProject(userId, project) {
  return co(function*() {
    const newProject = Object.assign({}, project, { userId });
    const db = yield getMongdb();
    const collection = db.collection(CLASS_NAME);

    yield collection.ensureIndex({
      userId: 1
    });
    const result = yield collection.insertOne(newProject);

    if (result.ops && result.ops.length) {
      return mapId(result.ops[0]);
    }
  });
}

export function updateProject(projectId, project) {
  return co(function*() {
    const db = yield getMongdb();
    const collection = db.collection(CLASS_NAME);

    return yield collection
    .updateOne({
      _id: ObjectID(projectId)
    }, {
      $set: project
    });
  });
}

export function deleteProject(projectId) {
  console.log(projectId);
  return co(function*() {
    const db = yield getMongdb();
    const collection = db.collection(CLASS_NAME);

    return yield collection.deleteOne({
      _id: ObjectID(projectId)
    });
  });
}
