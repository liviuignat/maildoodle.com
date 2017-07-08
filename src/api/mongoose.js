import mongoose from 'mongoose';

const schemaSettings = {
  transform: function(doc, ret) {
    ret.objectId = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  companyName: { type: String },
  authToken: { type: String, index: true },
  apiAccessToken: { type: String, index: true },
  verified: { type: Boolean },
  createdAt: { type: Date }
});

const languageSchema = new mongoose.Schema({
  key: { type: String },
  name: { type: String }
});

const layoutSchema = new mongoose.Schema({
  name: { type: String },
  value: { type: String }
});

const templateVersionSchemaBase = {
  html: { type: String },
  sampleJson: { type: String },
  translations: [],
};
const templateVersionSchema = new mongoose.Schema(Object.assign({}, templateVersionSchemaBase, {
  templateId: { type: String, required: true, index: true },
  isProduction: { type: Boolean, required: true, index: true },
  commitMessage: { type: String, required: true, index: true },
  createdAt: { type: Date }
}));
const templateSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  developmentVersion: templateVersionSchemaBase
});

const projectSchema = new mongoose.Schema({
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
templateVersionSchema.set('toJSON', schemaSettings);

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

export const User = mongoose.model('User', userSchema);
export const Project = mongoose.model('Project', projectSchema);
export const Template = mongoose.model('Template', templateSchema);
export const TemplateVersion = mongoose.model('TemplateVersion', templateVersionSchema);
