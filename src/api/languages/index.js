import { requiredAuthenticated } from './../middleware';
import { sendHttpError } from './../http';

import {
  getProjectById,
  updateProject
} from './../projects/projects'

export function setupRoutes(app, prefix=''){
	app.post(`${prefix}/:projectId/languages`, requiredAuthenticated, (req, res) => {
	  getProjectById(req.user.objectId, req.params.projectId)
	    .then((project) => {
			project.languages.push(req.body)
		    return updateProject(project.objectId, project);
	    })
	    .then(() => getProjectById(req.user.objectId, req.params.projectId))
	    .then((project) => {
	    	const newLanguageKey = req.body.key;
		    const addedLanguage = project.languages.find((element) => {
		    	if (element.key === newLanguageKey) {
		    		return true;
		    	}

		     	return false;
		    });

		    return res.json(addedLanguage);
	    })
	    .catch((err) => sendHttpError(res, { code: 400, err }));
	});

	app.get(`${prefix}/:projectId/languages/:languageId`, requiredAuthenticated, (req, res) => {
		getProjectById(req.user.objectId, req.params.projectId)
		.then((project) => {
			const result = project.languages.find((element) => {
		    	if (element.objectId === req.params.languageId) {
		    		return true;
		    	}

		     	return false;
		    });

		    if (!result) {
		    	sendHttpError(res, {code: 404});
		    }

		    return res.json(result);
		})
		.catch((err) => sendHttpError(res, { code: 400, err }));
	});
}