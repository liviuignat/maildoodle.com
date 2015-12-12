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

  it('initial state should a null project',
    () => expect(reducer().project).to.deep.equal(null));

  describe('WHEN starting to load a project', () => {
    let action = { type: actions.LOAD_PROJECT_DETAIL };
    beforeEach(() => currrentState = reducer(currrentState, action));

    it('should be loading the project',
      () => expect(currrentState.loadingProject).to.equal(true));

    describe('WHEN loaded project with success', () => {
      let action = {
        type: actions.LOAD_PROJECT_DETAIL_SUCCESS,
        result: newProject
      };
      beforeEach(() => currrentState = reducer(currrentState, action));

      it('should not be loading the project',
        () => expect(currrentState.loadingProject).to.equal(false));

      it('should have a project',
        () => expect(currrentState.project).not.to.equal(null));

      it('project should have no template',
        () => expect(currrentState.project.templates.length).to.equal(0));

      it('project should have a language',
        () => expect(currrentState.project.languages.length).to.equal(1));

      it('project should have a layout',
        () => expect(currrentState.project.layouts.length).to.equal(1));
    });
  });
});
