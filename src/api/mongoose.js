import {Schema, model} from 'mongoose';

var schemaSettings = {
  transform: function (doc, ret, options) {
    ret.objectId = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
};

const userSchema = new Schema({
  email: { type: String, required: true, index: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  authToken: { type: String, index: true },
  sessionToken: { type: String, index: true },
  apiAccessToken: { type: String, index: true },
  verified: { type: Boolean },
  createdAt: { type: Date }
});

userSchema.set('toJSON', schemaSettings);

function mapEntity(entity) {
  if (!entity) {
    return entity;
  }
  var json = entity.toJSON();
  return json;
}

function mapEntitiesArray(entities) {
  return entities.map(function (entity) {
    return mapEntity(entity);
  });
}

export function toJson(entityOrArray) {
  if (!entityOrArray) {
    return entityOrArray;
  }
  var isArray = typeof entityOrArray.map === 'function';
  if (isArray) {
    return mapEntitiesArray(entityOrArray);
  } else {
    return mapEntity(entityOrArray);
  }
}

export const User = model('User', userSchema);