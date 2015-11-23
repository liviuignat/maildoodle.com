import { requiredAuthenticated } from './../middleware';
import { sendHttpError } from './../http';

import {
  getProjectById,
  updateProject
} from './../projects/projects'

export function setupRoutes(app, prefix=''){
	app.post(`${prefix}/:projectId/languages`, requiredAuthenticated, (request, response) => {
	  getProjectById(request.user.objectId, request.params.projectId)
	    .then((project) => {
			project.languages.push(request.body)
		    return updateProject(project.objectId, project);
	    })
	    .then(() => getProjectById(request.user.objectId, request.params.projectId))
	    .then((project) => {
	    	const newLanguageKey = request.body.key;
		    const addedLanguage = project.languages.find((element) => {
		    	if (element.key === newLanguageKey) {
		    		return true;
		    	}

		     	return false;
		    });

		    return response.json(addedLanguage);
	    })
	    .catch((err) => sendHttpError(response, { code: 400, err }));
	});

	app.get(`${prefix}/:projectId/languages/:languageId`, requiredAuthenticated, (request, response) => {
		getProjectById(request.user.objectId, request.params.projectId)
		.then((project) => {
			console.log(project);
			const result = project.languages.find((element) => {
		    	if (element.objectId === reqeust.params.languageId) {
		    		return true;
		    	}

		     	return false;
		    });

		    if (!result) {
		    	sendHttpError(response, {code: 404});
		    }

		    return response.json(result);
		})
		.catch((err) => sendHttpError(response, { code: 400, err }));
	});
}