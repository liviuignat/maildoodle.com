import supertest from 'supertest';
import app from './../universal/expressApp';
import {parse} from './parse';

export function cleanup() {
  return new Promise((resolve, reject) => {
    parse.deleteAllUsers((err, response) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

export const request = supertest(app);