import {reducer} from './../reducer';
import * as actions from './../actions';

describe('GIVEN project detail reducer tests', () => {
  let currrentState = reducer();
  const newLayout = {
    objectId: '1234',
    name: 'new Layout',
    value: '<html><!--CONTENT--></html>'
  };

  it('initial state should a null layout',
    () => expect(reducer().layout).toEqual(null));

  describe('WHEN starting to load a layout', () => {
    let action = { type: actions.LOAD_LAYOUT_DETAIL };
    beforeEach(() => currrentState = reducer(currrentState, action));

    it('should be loading the layout',
      () => expect(currrentState.isLoadingLayout).toEqual(true));

    describe('WHEN loaded layout with success', () => {
      let action = {
        type: actions.LOAD_LAYOUT_DETAIL_SUCCESS,
        result: newLayout
      };
      beforeEach(() => currrentState = reducer(currrentState, action));

      it('should not be loading the layout',
        () => expect(currrentState.isLoadingLayout).toEqual(false));

      it('should have a layout',
        () => expect(currrentState.layout).not.toEqual(null));

      it('layout should have the new name',
        () => expect(currrentState.layout.name).toEqual(newLayout.name));

      it('layout should have the new value',
        () => expect(currrentState.layout.value).toEqual(newLayout.value));

      describe('WHEN updating layout', () => {
        let action = { type: actions.UPDATE_LAYOUT_DETAIL };
        beforeEach(() => currrentState = reducer(currrentState, action));

        it('should isUpdatingLayout set to true',
          () => expect(currrentState.isUpdatingLayout).toEqual(true));

        describe('WHEN updating layout success', () => {
          let updatedLayout = Object.assign(newLayout, {
            name: 'updated layout',
            value: 'some updated value'
          });
          let action = {
            type: actions.UPDATE_LAYOUT_DETAIL_SUCCESS,
            result: updatedLayout
          };
          beforeEach(() => currrentState = reducer(currrentState, action));

          it('should isUpdatingLayout set to false',
            () => expect(currrentState.isUpdatingLayout).toEqual(false));

          it('should have a layout',
            () => expect(currrentState.layout).not.toEqual(null));

          it('layout should have the new name',
            () => expect(currrentState.layout.name).toEqual(updatedLayout.name));

          it('layout should have the new value',
            () => expect(currrentState.layout.value).toEqual(updatedLayout.value));
        });
      });
    });
  });
});
