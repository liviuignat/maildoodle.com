import MongoDb, {MongoClient} from 'mongodb';
import config from './config';

export const ObjectID = MongoDb.ObjectID;

export function getMongdb() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.mongodb.url, (err, db) => {
      if (err) {
        return reject(err);
      }
      return resolve(db);
    });
  });
}

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
  if (entity) {
    const entityClone = Object.assign({}, entity);
    entityClone._id = entity._id.toString();
    return mapProp(entityClone, '_id', 'objectId');
  }
}
