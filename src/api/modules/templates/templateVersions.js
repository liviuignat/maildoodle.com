import co from 'co';
import {TemplateVersion, toJson} from './../../mongoose';

export const DEFAULT_COMMIT_MESSAGE = 'Initial commit';

export function getDefaultVersion() {
  return {
    html: `<div><%= model.title %><div>`,
    sampleJson: `{"title": "Welcome"}`
  };
}

export function getTemplateVersionById(templateId, versionId) {
  return co(function*() {
    const templateVersion = yield TemplateVersion.findOne({
      _id: versionId,
      templateId
    });
    return toJson(templateVersion);
  });
}

export function getTemplateVersionsByTemplateId(templateId) {
  return co(function*() {
    const templateVersion = yield TemplateVersion.find({
      templateId
    });
    return toJson(templateVersion) || [];
  });
}

export function insertTemplateVersion(templateId, template) {
  return co(function*() {
    if (!templateId) {
      throw new Error('required parameter templateId is missing');
    }

    const defaultVersion = getDefaultVersion();
    defaultVersion.templateId = templateId;
    defaultVersion.isProduction = false;
    defaultVersion.createdAt = new Date();

    const newVersion = new TemplateVersion(Object.assign({}, defaultVersion, template));
    const templateVersion = yield newVersion.save();
    return toJson(templateVersion);
  });
}

export function updateTemplateToProductionVersion(templateId, versionId) {
  return co(function*() {
    yield TemplateVersion.update({
      isProduction: true,
      templateId
    }, { isProduction: false });

    return yield TemplateVersion.update({
      _id: versionId,
      templateId
    }, { isProduction: true });
  });
}

export function deleteTemplateVersionsByTemplateId(templateId) {
  return co(function*() {
    return yield TemplateVersion.find({
      templateId
    }).remove();
  });
}
