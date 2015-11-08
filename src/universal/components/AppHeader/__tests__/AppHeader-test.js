import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {Provider} from 'react-redux';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import createStore from '../../../redux/create';
import ApiClient from './../../../helpers/ApiClient';
import AppHeader from './../AppHeader';

const client = new ApiClient();

function createComponent(mockStore, props) {
  const store = createStore(reduxReactRouter, null, createHistory, client, mockStore);
  const renderer = ReactTestUtils.renderIntoDocument(
    <Provider store={store} key="provider">
      <AppHeader {...props}/>
    </Provider>
  );
  return renderer;
}

describe('AppHeader when NOT logged in', () => {
  const mockStore = {
    auth: {
      user: null
    }
  };
  const props = {
    isLoggedIn: false
  };
  const component = createComponent(mockStore, props);

  it('should render correctly', () => {
    return expect(component).to.be.ok;
  });

  it('should render with correct value', () => {
    const loginLink = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'mdl-navigation__link')[0];
    expect(loginLink.textContent).to.equal('Login');
  });
});

describe('AppHeader when logged in', () => {
  const mockStore = {
    auth: {
      user: {}
    }
  };
  const props = {
    isLoggedIn: true
  };
  const component = createComponent(mockStore, props);

  it('should render correctly', () => {
    return expect(component).to.be.ok;
  });

  it('should render with correct value', () => {
    const loginLink = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'mdl-navigation__link')[0];
    expect(loginLink.textContent).to.equal('Logout');
  });
});
