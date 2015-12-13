import co from 'co';
import {Project, toJson} from './../mongoose';

const CLASS_NAME = 'templates';

export function getTemplatesByProjectId(userId, projectId) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });
    return toJson(project).templates;
  });
}

export function insertTemplate(userId, projectId, template) {
  return co(function*() {
    let project = yield Project.findOne({
      _id: projectId,
      userId
    });
    const newTemplate = project.templates.create(template);
    project.templates.push(newTemplate);
    yield project.save();
    return toJson(newTemplate);
  });
}

export function updateTemplate(userId, projectId, templateId, template) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });
    const existingTemplate = project.templates.id(templateId);
    const newTemplate = Object.assign(existingTemplate, template);
    yield project.save();

    return toJson(newTemplate)
  });
}

export function deleteTemplate(userId, projectId, templateId) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });
    const existingTemplate = project.templates.id(templateId);
    existingTemplate.remove();
    return yield project.save();
  });
}
