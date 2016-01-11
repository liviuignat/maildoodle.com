import {expect} from 'chai';
import {layouts, translations, versions} from './templateGeneratorService-mocks';
import {getHtml} from './../templateGeneratorService';

describe('GIVEN a templateGeneratorService', () => {
  const defaults = {
    layouts,
    versions,
    translations,
    filter: {},
    model: {
      message: 'message',
      title: 'title'
    }
  };
  let options = null;
  let html;

  describe('WHEN getting html with defaults', () => {
    const expectation = '<html><div>message</div></html>';
    const aditionalOptions = {};

    beforeEach(() => options = Object.assign({}, defaults, aditionalOptions));
    beforeEach(() => html = getHtml(options));

    it('should get the correct html',
      () => expect(html).to.equal(expectation));
  });

  describe('WHEN passing a version id as the second version', () => {
    const expectation = '<html><div><h2>title</h2>message</div></html>';
    const aditionalOptions = {
      filter: {versionId: versions[1].objectId}
    };

    beforeEach(() => options = Object.assign({}, defaults, aditionalOptions));
    beforeEach(() => html = getHtml(options));

    it('should use the second version and get the correct html',
      () => expect(html).to.equal(expectation));
  });

  describe('WHEN passing no versionId but the second version is production', () => {
    const expectation = '<html><div><h2>title</h2>message</div></html>';
    const aditionalOptions = {};

    beforeEach(() => options = Object.assign({}, defaults, aditionalOptions));
    beforeEach(() => options.versions[1].isProduction = true);
    beforeEach(() => html = getHtml(options));

    it('should use the production version and get the correct html',
      () => expect(html).to.equal(expectation));
  });

  describe('WHEN passing a layout id as the second layout', () => {
    const expectation = '<html><h1>merry christmas</h1><div><h2>title</h2>message</div></html>';
    const aditionalOptions = {
      filter: {layoutId: layouts[1].objectId}
    };

    beforeEach(() => options = Object.assign({}, defaults, aditionalOptions));
    beforeEach(() => html = getHtml(options));

    it('should use the second version and get the correct html',
      () => expect(html).to.equal(expectation));
  });
});




