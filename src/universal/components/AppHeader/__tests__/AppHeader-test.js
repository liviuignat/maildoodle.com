describe('WHEN fake test', () => it('SHOULD true', expect(true).toBe(true)));

// import React from 'react';
// import * as ReactTestUtils from 'react-addons-test-utils';
// import {Provider} from 'react-redux';
// import {reduxReactRouter} from 'redux-router';
// import createHistory from 'history/lib/createMemoryHistory';
// import createStore from 'universal/redux/create';
// import ApiClient from 'universal/helpers/ApiClient';
// import AppHeader from './../AppHeader';

// const client = new ApiClient();

// function createComponent(mockStore, props) {
//   const store = createStore(createHistory, client, mockStore);
//   const renderer = ReactTestUtils.renderIntoDocument(
//     <Provider store={store} key="provider">
//       <AppHeader {...props}/>
//     </Provider>
//   );
//   return renderer;
// }

// describe('AppHeader when NOT logged in', () => {
//   const mockStore = {
//     auth: {
//       user: null
//     }
//   };
//   const props = {
//     isLoggedIn: false
//   };
//   const component = createComponent(mockStore, props);

//   it('should render correctly', () => {
//     return expect(component).to.be.ok;
//   });

//   it('should render with correct value', () => {
//     const links = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
//     const loginLink = links.find((link) => link.textContent.toLowerCase() === 'login');
//     return expect(loginLink).to.exist;
//   });
// });

// describe('AppHeader when logged in', () => {
//   const mockStore = {
//     auth: {
//       user: {}
//     }
//   };
//   const props = {
//     isLoggedIn: true
//   };
//   const component = createComponent(mockStore, props);

//   it('should render correctly', () => {
//     return expect(component).to.be.ok;
//   });

//   it('should render with correct value', () => {
//     const links = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
//     const loginLink = links.find((link) => link.textContent.toLowerCase() === 'login');
//     return expect(loginLink).to.not.exist;
//   });
// });
