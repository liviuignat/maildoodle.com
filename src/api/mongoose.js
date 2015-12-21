import {Schema, model} from 'mongoose';

const schemaSettings = {
  transform: function(doc, ret) {
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

const languageSchema = new Schema({
  key: { type: String },
  name: { type: String }
});

const layoutSchema = new Schema({
  name: { type: String },
  value: { type: String }
});

const templateSchema = new Schema({
  name: { type: String },
  description: { type: String },
  templateHtml: { type: String },
  sampleJson: { type: String }
});

const projectSchema = new Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  description: { type: String },
  layouts: [layoutSchema],
  languages: [languageSchema],
  templates: [templateSchema]
});

languageSchema.set('toJSON', schemaSettings);
layoutSchema.set('toJSON', schemaSettings);
projectSchema.set('toJSON', schemaSettings);
userSchema.set('toJSON', schemaSettings);
templateSchema.set('toJSON', schemaSettings);

function mapEntity(entity) {
  if (!entity) {
    return entity;
  }
  const json = entity.toJSON();
  return json;
}

function mapEntitiesArray(entities) {
  return entities.map(function(entity) {
    return mapEntity(entity);
  });
}

export function toJson(entityOrArray) {
  if (!entityOrArray) {
    return entityOrArray;
  }
  const isArray = typeof entityOrArray.map === 'function';
  if (isArray) {
    return mapEntitiesArray(entityOrArray);
  }
  return mapEntity(entityOrArray);
}

export const User = model('User', userSchema);
export const Project = model('Project', projectSchema);
export const Template = model('Template', templateSchema);
