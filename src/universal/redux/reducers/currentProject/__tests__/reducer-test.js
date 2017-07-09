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
    () => expect(reducer().project).toEqual(null));

  describe('WHEN starting to load a project', () => {
    let action = { type: actions.LOAD_PROJECT_DETAIL };
    beforeEach(() => currrentState = reducer(currrentState, action));

    it('should be loading the project',
      () => expect(currrentState.loadingProject).toEqual(true));

    describe('WHEN loaded project with success', () => {
      let action = {
        type: actions.LOAD_PROJECT_DETAIL_SUCCESS,
        result: newProject
      };
      beforeEach(() => currrentState = reducer(currrentState, action));

      it('should not be loading the project',
        () => expect(currrentState.loadingProject).toEqual(false));

      it('should have a project',
        () => expect(currrentState.project).not.toEqual(null));

      it('project should have no template',
        () => expect(currrentState.project.templates.length).toEqual(0));

      it('project should have a language',
        () => expect(currrentState.project.languages.length).toEqual(1));

      it('project should have a layout',
        () => expect(currrentState.project.layouts.length).toEqual(1));
    });
  });
});
