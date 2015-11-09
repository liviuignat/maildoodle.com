import {parse} from './../parse';

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
