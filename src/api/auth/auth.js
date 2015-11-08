import { Parse } from 'node-parse-api';
import config from './../../config';

const parse = new Parse(config.parse.options);

export function login(email, password) {
  return new Promise((resolve, reject) => {
    parse.loginUser(email, password, (err, response) => {
      if (err) {
        return reject(err);
      }

      return resolve(response);
    });
  });
}
