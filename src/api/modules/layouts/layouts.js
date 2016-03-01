import co from 'co';
import {Project, toJson} from './../../mongoose';

export function insertLayout(userId, projectId, newLayout) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });

    if (!project) {
      throw new Error(`No project with id ${projectId}`);
    }

    const addedLayout = project.layouts.create(newLayout);
    project.layouts.push(addedLayout);

    yield project.save();

    return toJson(addedLayout);
  });
}

export function updateLayout(userId, projectId, layoutId, layout) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });
    const existingLayout = project.layouts.id(layoutId);

    if (!existingLayout) {
      throw new Error(`No layout with id ${layoutId}`);
    }

    Object.assign(existingLayout, layout);

    const response = yield existingLayout.parent().save();
    return response;
  });
}

export function getLayoutById(userId, projectId, layoutId) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });
    const layout = project.layouts.id(layoutId);

    if (!layout) {
      throw new Error(`No layout with id ${layoutId}`);
    }

    return toJson(layout);
  });
}

export function deleteLayout(userId, projectId, layoutId) {
  return co(function*() {
    const project = yield Project.findOne({
      _id: projectId,
      userId
    });

    if (!project) {
      throw new Error(`No project with id ${projectId}`);
    }

    const existingTemplate = project.layouts.id(layoutId);
    existingTemplate.remove();

    const response = yield project.save();
    return response;
  });
}
