import co from 'co';
import {Project, toJson} from './../../mongoose';

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

export function getProjectByIdAndQuery(userId, projectId, query) {
  return co(function*() {
    const select = query || {};
    const projection = {
      '-templates.developmentVersion': !select.withTemplateHtml,
      '-layouts.value': !select.withLayoutHtml
    };
    const mongooseSelection = Object.keys(projection)
      .filter(key => projection[key])
      .join(' ');

    const project = yield Project.findOne({
      _id: projectId,
      userId
    }).select(mongooseSelection)
      .exec();

    return toJson(project);
  });
}

export function insertProject(userId, project) {
  return co(function*() {
    const newProject = Object.assign({}, project, {
      userId,
      languages: [getDefaultLanguage()],
      layouts: [getDefaultLayout()]
    });

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

function getDefaultLanguage() {
  return {
    key: 'default',
    name: 'default'
  };
}

function getDefaultLayout() {
  return {
    name: 'default',
    value: '<html> <head> </head> <body> <!--CONTENT--> </body> </html>'
  };
}
