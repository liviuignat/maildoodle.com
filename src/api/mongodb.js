import {MongoClient} from 'mongodb';
import config from './config';

export function getMongdb() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.mongodb.url, (err, db) => {
      if (err) {
        return reject(err);
      }
      return resolve(db);
    });
  });
};

export function mapProp(entity, field, toField) {
  if (entity) {
    const newObject = Object.assign({
      [toField]: entity[field]
    }, entity);
    delete newObject[field];
    return newObject;
  }
}

export function mapId(entity) {
  return mapProp(entity, '_id', 'objectId');
}