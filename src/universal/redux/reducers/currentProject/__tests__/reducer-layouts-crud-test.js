import {reducer} from './../reducer';
import * as actions from './../actions';

describe('GIVEN project detail reducer tests', () => {
  let currrentState = reducer();
  const newProject = {
    objectId: '1234',
    name: 'some project',
    description: 'some project description',
    templates: [],
    layouts: [{
      name: 'default',
      value: '<html><!--CONTENT--></html>'
    }],
    languages: [{key: 'default'}]
  };

  const newLayout = {
    objectId: '5678',
    name: 'new layout',
    value: '<html>Merry christmas!<!--CONTENT--></html>'
  };

  describe('WHEN loaded project with success', () => {
    let action = {
      type: actions.LOAD_PROJECT_DETAIL_SUCCESS,
      result: newProject
    };
    beforeEach(() => currrentState = reducer(currrentState, action));

    describe('WHEN adding a layout with success', () => {
      let action = {
        type: actions.INSERT_LAYOUT_SUCCESS,
        result: {
          projectId: newProject.objectId,
          layout: newLayout
        }
      };
      beforeEach(() => currrentState = reducer(currrentState, action));

      it('should have 2 layouts in the list',
        () => expect(currrentState.project.layouts.length).toEqual(2));

      it('should have the correct layout',
        () => expect(currrentState.project.layouts[1]).toEqual(action.result.layout));

      describe('WHEN updating a layout with success', () => {
        let action = {
          type: actions.UPDATE_LAYOUT_SUCCESS,
          result: {
            projectId: newProject.objectId,
            layout: Object.assign(newLayout, {
              name: 'updated layout',
              value: '<html>Updated layout!<!--CONTENT--></html>'
            })
          }
        };
        beforeEach(() => currrentState = reducer(currrentState, action));

        it('should have 2 layouts layout in the list',
          () => expect(currrentState.project.layouts.length).toEqual(2));

        it('should have the correct layout name',
          () => expect(currrentState.project.layouts[1].name)
            .toEqual(action.result.layout.name));
      });

      describe('WHEN deleting a layout with success', () => {
        let action = {
          type: actions.DELETE_LAYOUT_SUCCESS,
          result: {
            projectId: newProject.objectId,
            objectId: newLayout.objectId
          }
        };
        beforeEach(() => currrentState = reducer(currrentState, action));

        it('should have one layout in the list',
          () => expect(currrentState.project.layouts.length).toEqual(1));

        it('should have a layout with name default',
          () => expect(currrentState.project.layouts[0].name).toEqual('default'));
      });
    });
  });
});
