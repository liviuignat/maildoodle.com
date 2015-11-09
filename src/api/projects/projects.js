import { Parse } from 'node-parse-api';
import config from './../../config';

const parse = new Parse(config.parse.options);

export function getProjects() {
  return new Promise((resolve, reject) => {
    parse.find('projects', {}, function (err, response) {
      if (err) {
        return reject(err);
      }
      return resolve(response.results);
    });
  });
}

export function getProjectById(id) {
  return new Promise((resolve, reject) => {
    parse.find('projects', {objectId: id}, function (err, response) {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
}

export function insertProject(project) {
  return new Promise((resolve, reject) => {
    parse.insert('projects', project, function (err, response) {
      if (err) {
        return reject(err);
      }

      return resolve(response);
    });
  });
}
