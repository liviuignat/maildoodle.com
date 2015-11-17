import co from 'co';
import {ObjectID, getMongdb, mapId} from './../mongodb';
import {getTemplatesByProjectId} from './../templates/templates';

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

    const item = yield collection
      .findOne({ _id: ObjectID(projectId), userId });

    if (!item) {
      return null;
    }

    const project = mapId(item);
    const templates = yield getTemplatesByProjectId(userId, project.objectId);
    return Object.assign({}, project, {
      templates: templates
    });
  });
}

export function insertProject(userId, project) {
  return co(function*() {
    const newProject = Object.assign({}, project, {
      userId,
      languages: [getDefaultLanguage()],
      layouts: [getDefaultLayout()]
    });
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
  return co(function*() {
    const db = yield getMongdb();
    const collection = db.collection(CLASS_NAME);

    return yield collection.deleteOne({
      _id: ObjectID(projectId)
    });
  });
}

function getDefaultLanguage() {
  return {
    key: 'default',
    name: 'default'
  };
}

function getDefaultLayout() {
  return {
    name: 'default',
    value: '<html> <head> </head> <body> <!--CONTENT--> </body> </html>'
  };
}
