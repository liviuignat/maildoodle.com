import co from 'co';
import {Project, toJson} from './../../mongoose';

export function insertLanguage(userId, projectId, newLanguage) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });

    if (!project) {
      throw new Error(`No project with id ${projectId}`);
    }

    const addedLanguage = project.languages.create(newLanguage);
    project.languages.push(addedLanguage);

    yield project.save();

    return toJson(addedLanguage);
  });
}


export function updateLanguage(userId, projectId, languageId, language) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });
    const existingLanguage = project.languages.id(languageId);

    if (!existingLanguage) {
      throw new Error(`No language with id ${languageId}`);
    }

    Object.assign(existingLanguage, language);

    const response = yield existingLanguage.parent().save();
    return response;
  });
}

export function getLanguageById(userId, projectId, languageId) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });
    const language = project.languages.id(languageId);

    if (!language) {
      throw new Error(`No language with id ${languageId}`);
    }

    return toJson(language);
  });
}

export function deleteLanguage(userId, projectId, languageId) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });

    if (!project) {
      throw new Error(`No project with id ${projectId}`);
    }

    const existingTemplate = project.languages.id(languageId);
    existingTemplate.remove();

    const response = yield project.save();
    return response;
  });
}
