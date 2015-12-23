import {expect} from 'chai';
import {reducer} from './../reducer';
import * as actions from './../actions';

describe('GIVEN template detail reducer tests', () => {
  let currrentState = reducer();
  const newTemplate = {
    objectId: '1234',
    name: 'some template',
    description: 'some template description',
    developmentVersion: {
      html: 'initial html',
      sampleJson: 'initial json',
      translations: []
    },
    versions: []
  };

  it('initial state should a null template',
    () => expect(reducer().template).to.deep.equal(null));

  describe('WHEN starting to load a template', () => {
    let action = { type: actions.LOAD_TEMPLATE_DETAIL };
    beforeEach(() => currrentState = reducer(currrentState, action));

    it('should be loading the template',
      () => expect(currrentState.loadingTemplate).to.equal(true));

    describe('WHEN loaded template with success', () => {
      let action = {
        type: actions.LOAD_TEMPLATE_DETAIL_SUCCESS,
        result: newTemplate
      };
      beforeEach(() => currrentState = reducer(currrentState, action));

      it('should not be loading the template',
        () => expect(currrentState.loadingTemplate).to.equal(false));

      it('should have a template',
        () => expect(currrentState.template).not.to.equal(null));

      describe('WHEN updated development version html and sampleJSon with success', () => {
        let newVersion = {
          html: 'changed html',
          sampleJson: 'changed json'
        };

        let action = {
          type: actions.UPDATE_DEVELOPMENT_VERSION_SUCCESS,
          result: {
            developmentVersion: newVersion
          }
        };
        beforeEach(() => currrentState = reducer(currrentState, action));

        it('should have the new html',
          () => expect(currrentState.template.developmentVersion.html).to.equal(newVersion.html));

        it('should have the new sample json',
          () => expect(currrentState.template.developmentVersion.sampleJson).to.equal(newVersion.sampleJson));
      });
    });
  });
});
