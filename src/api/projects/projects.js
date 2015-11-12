import co from 'co';
import {getMongdb, mapId} from './../mongodb';

const CLASS_NAME = 'projects';

// export function getProjects(userId) {
//   return new Promise((resolve, reject) => {
//     const newProject = Object.assign({}, project, { userId });
//     getMongdb().then((db) => {
//       db.collection(CLASS_NAME).insert(newProject, (err, result) => {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(result);
//       });
//     })
//   });
// }

// export function getProjectById(userId, projectId) {
//   return new Promise((resolve, reject) => {
//     const query = {
//       objectId: projectId,
//       user: userId
//     };

//     parse.find(CLASS_NAME, query, (err, response) => {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(response);
//     });
//   });
// }

// export function insertProject(userId, project) {
//   return new Promise((resolve, reject) => {
//     const newProject = Object.assign({}, project, { userId });
//     getMongdb().then((db) => {
//       db.collection(CLASS_NAME).insert(newProject, (err, result) => {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(result);
//       });
//     })
//   });
// }

export function updateProject(projectId, project) {
  return new Promise((resolve, reject) => {
    parse.update(CLASS_NAME, projectId, project, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
}

export function deleteProject(projectId) {
  return new Promise((resolve, reject) => {
    parse.delete(CLASS_NAME, projectId, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
}

export function getProjects(userId) {
  return co(function*() {
    const db = yield getMongdb();
    const collection = db.collection(CLASS_NAME);

    return yield collection.find({
      userId
    }).toArray();
  });
}

export function getProjectById(userId, projectId) {
  return co(function*() {
    const db = yield getMongdb();
    const collection = db.collection(CLASS_NAME);

    return yield collection.find({
      _id: projectId,
      userId
    });
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
