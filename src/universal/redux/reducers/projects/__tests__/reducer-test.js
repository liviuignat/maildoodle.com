import {reducer} from './../reducer';
import * as actions from './../actions';

describe('Projects Reducer tests', () => {
  let currrentState = reducer();

  it('Initial state should have an empty list', () => {
    expect(reducer().list).toEqual([]);
  });

  describe('When successfuly loading projects', () => {
    const loadAction = {
      type: actions.LOAD_PROJECT_LIST_SUCCESS,
      result: [{
        objectId: 'iodas',
        name: 'project 1'
      }]
    };

    beforeEach(() => {
      currrentState = reducer(currrentState, loadAction);
    });

    it('Should have that project in the list', () => {
      expect(currrentState.list).toEqual(loadAction.result);
    });

    describe('When successfuly adding a project', () => {
      const addAction = {
        type: actions.INSERT_PROJECT_SUCCESS,
        result: {
          objectId: 'new',
          name: 'new project'
        }
      };

      beforeEach(() => {
        currrentState = reducer(currrentState, addAction);
      });

      it('Should have 2 items', () => {
        expect(currrentState.list.length).toEqual(2);
      });

      it('Should have that project in the list', () => {
        const project = currrentState.list[1];
        expect(project).toEqual(addAction.result);
      });

      describe('When successfuly updating the first project', () => {
        const updateAction = {
          type: actions.UPDATE_PROJECT_SUCCESS,
          result: {
            objectId: 'iodas',
            name: 'first project updated'
          }
        };

        beforeEach(() => {
          currrentState = reducer(currrentState, updateAction);
        });

        it('Should have 2 items', () => {
          expect(currrentState.list.length).toEqual(2);
        });

        it('Should have the updated values', () => {
          const project = currrentState.list[0];
          expect(project).toEqual(updateAction.result);
        });
      });

      describe('When successfuly updating the added project', () => {
        const updateAction = {
          type: actions.UPDATE_PROJECT_SUCCESS,
          result: {
            objectId: addAction.result.objectId,
            name: 'new project updated'
          }
        };

        beforeEach(() => {
          currrentState = reducer(currrentState, updateAction);
        });

        it('Should have 2 items', () => {
          expect(currrentState.list.length).toEqual(2);
        });

        it('Should have the updated values', () => {
          const project = currrentState.list[1];
          expect(project).toEqual(updateAction.result);
        });
      });

      describe('When updating a project that does not exist', () => {
        const updateAction = {
          type: actions.UPDATE_PROJECT_SUCCESS,
          result: {
            objectId: 'does not exist, dude',
            name: 'new project updated that does not exist will be updated'
          }
        };

        beforeEach(() => {
          currrentState = reducer(currrentState, updateAction);
        });

        it('Should have 2 items', () => {
          expect(currrentState.list.length).toEqual(2);
        });

        it('Should NOT have the updated values', () => {
          const project = currrentState.list[1];
          expect(project).not.toEqual(updateAction.result);
        });
      });

      describe('When successfuly deleteing the added project', () => {
        const deleteAction = {
          type: actions.DELETE_PROJECT_SUCCESS,
          result: {
            objectId: addAction.result.objectId
          }
        };

        beforeEach(() => {
          currrentState = reducer(currrentState, deleteAction);
        });

        it('Should have 1 item', () => {
          expect(currrentState.list.length).toEqual(1);
        });

        it('Should still have the first item', () => {
          const project = currrentState.list[0];
          expect(project.objectId).toEqual('iodas');
        });
      });

      describe('When deleting a project that does not exist', () => {
        const deleteAction = {
          type: actions.DELETE_PROJECT_SUCCESS,
          result: {
            objectId: 'does not exist, dude'
          }
        };

        beforeEach(() => {
          currrentState = reducer(currrentState, deleteAction);
        });

        it('Should have 2 items', () => {
          expect(currrentState.list.length).toEqual(2);
        });
      });
    });
  });
});
