import { Parse } from 'node-parse-api';
import config from './../../config';

const parse = new Parse(config.parse.options);
const CLASS_NAME = 'Projects';

export function getProjects(userId) {
  return new Promise((resolve, reject) => {
    parse.find(CLASS_NAME, {user: userId}, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response.results);
    });
  });
}

export function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    parse.find(CLASS_NAME, {objectId: projectId}, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
}

export function insertProject(userId, project) {
  return new Promise((resolve, reject) => {
    const projectToInsert = Object.assign({}, project, {
      user: {
        __op: 'AddRelation',
        objects:[{
          __type: 'Pointer',
          className: '_User',
          objectId: userId
        }]
      }
    });

    parse.insert(CLASS_NAME, projectToInsert, (err, response) => {
      if (err) {
        return reject(err);
      }

      return resolve(response);
    });
  });
}
