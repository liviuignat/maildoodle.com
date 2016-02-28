import co from 'co';
import {Project, toJson} from './../../mongoose';
import {
  getTemplateVersionsByTemplateId,
  insertTemplateVersion,
  getDefaultVersion,
  deleteTemplateVersionsByTemplateId,
  DEFAULT_COMMIT_MESSAGE
} from './templateVersions';

export function getTemplatesByProjectId(userId, projectId) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });
    return toJson(project).templates;
  });
}

export function getTemplateById(userId, projectId, templateId) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });

    const template = project.templates.id(templateId);

    if (!template) {
      throw new Error(`No template with id ${templateId}`);
    }

    const templateJson = toJson(template);
    const templateVersions = yield getTemplateVersionsByTemplateId(templateJson.objectId);

    const returnValue = getFullTemplate(templateJson, templateVersions || []);
    return returnValue;
  });
}

export function insertTemplate(userId, projectId, template) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });

    if (!project) {
      throw new Error(`No project with id ${projectId}`);
    }

    const defaultTemplateVersion = getDefaultVersion();
    defaultTemplateVersion.commitMessage = DEFAULT_COMMIT_MESSAGE;

    template.developmentVersion = defaultTemplateVersion;
    const newTemplate = project.templates.create(template);
    project.templates.push(newTemplate);

    yield project.save();
    yield insertTemplateVersion(newTemplate._id, defaultTemplateVersion);

    return toJson(newTemplate);
  });
}

export function updateTemplate(userId, projectId, templateId, template) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });

    if (!project) {
      throw new Error(`No project with id ${projectId}`);
    }

    const existingTemplate = project.templates.id(templateId);
    const newTemplate = Object.assign(existingTemplate, template);

    yield project.save();

    return toJson(newTemplate);
  });
}

export function updateTemplateDevelopmentVersion(userId, projectId, templateId, version) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });

    const existingTemplate = project.templates.id(templateId);

    if (existingTemplate && existingTemplate.developmentVersion) {
      Object.assign(existingTemplate.developmentVersion, version);
      yield project.save();

      return toJson(existingTemplate);
    }
    return null;
  });
}

export function deleteTemplate(userId, projectId, templateId) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });

    if (!project) {
      throw new Error(`No project with id ${projectId}`);
    }

    const existingTemplate = project.templates.id(templateId);
    existingTemplate.remove();

    yield project.save();
    yield deleteTemplateVersionsByTemplateId(templateId);
  });
}

function getFullTemplate(template, versions) {
  return Object.assign({}, template, {
    versions
  });
}
