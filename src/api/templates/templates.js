import co from 'co';
import {ObjectID, getMongdb, mapId} from './../mongodb';

const CLASS_NAME = 'templates';

export function getTemplatesByProjectId(userId, projectId) {
  return co(function*() {
    const db = yield getMongdb();
    const collection = db.collection(CLASS_NAME);

    return yield collection
      .find({ userId, projectId })
      .toArray()
      .then((results) => results.map((item) => mapId(item)));
  });
}
