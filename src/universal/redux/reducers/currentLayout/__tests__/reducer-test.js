import {expect} from 'chai';
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
    () => expect(reducer().layout).to.deep.equal(null));

  describe('WHEN starting to load a layout', () => {
    let action = { type: actions.LOAD_LAYOUT_DETAIL };
    beforeEach(() => currrentState = reducer(currrentState, action));

    it('should be loading the layout',
      () => expect(currrentState.isLoadingLayout).to.equal(true));

    describe('WHEN loaded layout with success', () => {
      let action = {
        type: actions.LOAD_LAYOUT_DETAIL_SUCCESS,
        result: newLayout
      };
      beforeEach(() => currrentState = reducer(currrentState, action));

      it('should not be loading the layout',
        () => expect(currrentState.isLoadingLayout).to.equal(false));

      it('should have a layout',
        () => expect(currrentState.layout).not.to.equal(null));

      it('layout should have the new name',
        () => expect(currrentState.layout.name).to.equal(newLayout.name));

      it('layout should have the new value',
        () => expect(currrentState.layout.value).to.equal(newLayout.value));
    });
  });
});
