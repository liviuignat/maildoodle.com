import {expect} from 'chai';
import {reducer} from './../reducer';
import * as actions from './../actions';

describe('Projects Reducer tests', () => {
  let currrentState = reducer();

  it('Initial state should have an empty user',
    () => expect(reducer().user).to.be.undefined);

  describe('When signing up', () => {
    const signUp = {
      type: actions.SIGN_UP,
    };
    beforeEach(() => {
      currrentState = reducer(currrentState, signUp);
    });

    it('should have signing up flag true', () => {
      expect(currrentState.signingUp).to.equal(true);
    });

    it('should set error to empty', () => {
      expect(currrentState.signUpError).to.equal('');
    });
  });

  describe('When sign up failed', () => {
    const signUp = {
      type: actions.SIGN_UP_FAIL,
      error: 'it did not work'
    };

    beforeEach(() => {
      currrentState = reducer(currrentState, signUp);
    });

    it('should set the error message', () => {
      expect(currrentState.signUpError).to.equal(signUp.error);
    });

    it('should have signing up flag false', () => {
      expect(currrentState.signingUp).to.equal(false);
    });
  });

  describe('When sign up is successfull', () => {
    const signUp = {
      type: actions.SIGN_UP_SUCCESS,
      result: {
        email: 'liviu@ignat.email',
        password: 'blabla'
      }
    };
    beforeEach(() => {
      currrentState = reducer(currrentState, signUp);
    });

    it('should return the new user',
      () => expect(currrentState.user).to.not.be.undefined);

    it('should set error to empty', () => {
      expect(currrentState.signUpError).to.equal('');
    });

    it('should have signingUp flag set to false', () => {
      expect(currrentState.signingUp).to.equal(false);
    });

    it('should have the same email', () => {
      expect(currrentState.user.email).to.equal(signUp.result.email);
    });
  });
});
