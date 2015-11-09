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

export function signup(email, password){
  return new Promise((resolve, reject) => {
    let newUserAccount = {
      username: email,
      password,
      email
    };

    parse.insertUser(newUserAccount, (err, response) => {
      if(err){
        return reject(err);
      }

      return resolve(response);
    });
  });
}
