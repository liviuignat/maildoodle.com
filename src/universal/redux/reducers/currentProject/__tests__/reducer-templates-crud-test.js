import {expect} from 'chai';
import {reducer} from './../reducer';
import * as actions from './../actions';

describe('GIVEN project detail reducer tests', () => {
  let currrentState = reducer();
  const newProject = {
    objectId: '1234',
    name: 'some project',
    description: 'some project description',
    templates: [],
    layouts: [{name: 'name'}],
    languages: [{key: 'default'}]
  };

  const newTemplate = {
    objectId: '5678',
    name: 'new template'
  };

  describe('WHEN loaded project with success', () => {
    let action = {
      type: actions.LOAD_PROJECT_DETAIL_SUCCESS,
      result: newProject
    };
    beforeEach(() => currrentState = reducer(currrentState, action));

    describe('WHEN adding a template with success', () => {
      let action = {
        type: actions.INSERT_TEMPLATE_SUCCESS,
        result: {
          projectId: newProject.objectId,
          template: newTemplate
        }
      };
      beforeEach(() => currrentState = reducer(currrentState, action));

      it('should have one template in the list',
        () => expect(currrentState.project.templates.length).to.equal(1));

      it('should have the correct template',
        () => expect(currrentState.project.templates[0]).to.deep.equal(action.result.template));

      describe('WHEN updating a template with success', () => {
        let action = {
          type: actions.UPDATE_TEMPLATE_SUCCESS,
          result: {
            projectId: newProject.objectId,
            template: Object.assign(newTemplate, {
              name: 'updated template'
            })
          }
        };
        beforeEach(() => currrentState = reducer(currrentState, action));

        it('should have only one template in the list',
          () => expect(currrentState.project.templates.length).to.equal(1));

        it('should have the correct template name',
          () => expect(currrentState.project.templates[0].name)
            .to.deep.equal(action.result.template.name));
      });

      describe('WHEN deleting a template with success', () => {
        let action = {
          type: actions.DELETE_TEMPLATE_SUCCESS,
          result: {
            projectId: newProject.objectId,
            objectId: newTemplate.objectId
          }
        };
        beforeEach(() => currrentState = reducer(currrentState, action));

        it('should have no item in the list',
          () => expect(currrentState.project.templates.length).to.equal(0));
      });
    });
  });
});
