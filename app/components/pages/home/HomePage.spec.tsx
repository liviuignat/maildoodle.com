jest.dontMock('./HomePage');
jest.dontMock('./../../ComponentBase');

import React from 'react/addons';
const HomePage = require('./HomePage');
const TestUtils = React.addons.TestUtils;

describe('When HomePage component is rendered', () => {
  let component = null;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<HomePage/>);
  });

  it('Should have the welcome text rendered', () => {
    expect(React.findDOMNode(component).textContent).toContain(`Welcome`);
  });
});