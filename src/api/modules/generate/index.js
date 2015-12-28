import co from 'co';
import { sendHttpError } from './../../http';
import { requiredAuthenticated } from './../../middleware';
import { templateGeneratorService } from './../../services';
import { getProjectById } from './../projects/projects';
import { getTemplateVersionsByTemplateId } from './../templates/templateVersions';

export function setupRoutes(app, prefix = '/api/generate/:projectId/:templateId') {
  app.get(`${prefix}`, requiredAuthenticated, (req, res) => {
    co(function*() {
      const userId = req.user.objectId;
      const {projectId, templateId} = req.params;
      const {layoutId, versionId, json} = req.query;
      const model = JSON.parse(json);

      const versions = yield getTemplateVersionsByTemplateId(templateId);
      const project = yield getProjectById(userId, projectId);
      const {layouts} = project;

      const payload = {
        layouts, versions, model,
        filter: {layoutId, versionId}
      };

      const html = templateGeneratorService.getHtml(payload);
      return html;
    }).then((response) => res.json(response))
      .catch((err) => sendHttpError(res, { code: 400, err }));
  });
}
