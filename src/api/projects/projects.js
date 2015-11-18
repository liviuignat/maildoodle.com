import co from 'co';
import {Project, toJson} from './../mongoose';

const CLASS_NAME = 'projects';

export function getProjects(userId) {
  return co(function*() {
    const projects = yield Project.find({ userId });
    return toJson(projects);
  });
}

export function getProjectById(userId, projectId) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });
    return toJson(project);
  });
}

export function insertProject(userId, project) {
  return co(function*() {
    const newProject = Object.assign({}, project, { userId });

    const insertedProject = yield new Project(newProject).save();

    return toJson(insertedProject);
  });
}

export function updateProject(projectId, project) {
  return co(function*() {
    return yield Project.update({
      _id: projectId
    }, project);
  });
}

export function deleteProject(projectId) {
  return co(function*() {
    return yield Project.find({
      _id: projectId
    }).remove();
  });
}
