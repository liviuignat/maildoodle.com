import {expect} from 'chai';
import {reducer} from './../reducer';
import * as actions from './../actions';

describe('Auth Reducer tests', () => {
  let currrentState = reducer();

  it('SHOULD set the initial state to have an empty user',
    () => expect(reducer().user).to.be.undefined);

  describe('WHEN updateting user API access token', () => {
    let updateUser = {
      type: actions.UPDATE_API_ACCESS_TOKEN_USER
    }
    beforeEach(() => {
      currrentState = reducer(currrentState, updateUser);
    });

    it('SHOULD have the update in progress flag set to true',
      () => expect(currrentState.updatetingUserAPIAccessToken).to.equal(true));

    it('SHOULD have the error to nothing',
      () => expect(currrentState.updateAPIAccessTokenError).to.equal(''));
  });

   describe('WHEN the user API access token has an error', () => {
    const updateUser = {
      type: actions.UPDATE_API_ACCESS_TOKEN_USER_FAIL,
      error: 'update did not work'
    };

    beforeEach(() => {
      currrentState = reducer(currrentState, updateUser);
    });

    it('SHOULD have the update in progress flag set to false',
      () => expect(currrentState.updatetingUserAPIAccessToken).to.equal(false));

    it('SHOULD have the error set to the correct message',
      () => expect(currrentState.updateAPIAccessTokenError).to.equal(updateUser.error));
  });

  describe('WHEN updateting user', () => {
    const updateUser = {
      type: actions.UPDATE_CURRENT_USER
    };

    beforeEach(() => {
      currrentState = reducer(currrentState, updateUser);
    });

    it('SHOULD have the update in progress flag set to true',
      () => expect(currrentState.isUpdatingUser).to.equal(true));

    it('SHOULD have the error flag set to false',
      () => expect(currrentState.updateUserError).to.equal(''));

  });


  describe('WHEN updateting user returns error', () => {
    const updateUser = {
      type: actions.UPDATE_CURRENT_USER_FAIL,
      error: 'update did not work'
    };

    beforeEach(() => {
      currrentState = reducer(currrentState, updateUser);
    });

    it('SHOULD have the update in progress flag set to false',
      () => expect(currrentState.isUpdatingUser).to.equal(false));

    it('SHOULD have the error set to the correct message',
      () => expect(currrentState.updateUserError).to.equal(updateUser.error));
  });

  describe('WHEN updateting the user details is succesfull', () => {
    const updateUser = {
      type: actions.UPDATE_CURRENT_USER_SUCCESS,
      result: {
        email: 'liviu@ignat.email',
        password: 'blabla',
        firstName: 'Bill',
        lastName: 'Gates',
        companyName: 'micromoale'
      }
    };

    beforeEach(() => {
      currrentState = reducer(currrentState, updateUser);
    });

    it('SHOULD have the update in progress flag set to false',
      () => expect(currrentState.isUpdatingUser).to.equal(false));

    it('SHOULD have the error set nothing',
      () => expect(currrentState.updateUserError).to.equal(''));

    it('SHOULD correct first name',
      () => expect(currrentState.user.firstName).to.equal(updateUser.result.firstName));

    it('SHOULD correct last name',
      () => expect(currrentState.user.lastName).to.equal(updateUser.result.lastName));

    it('SHOULD correct company name',
      () => expect(currrentState.user.companyName).to.equal(updateUser.result.companyName));

    it('SHOULD correct email',
      () => expect(currrentState.user.email).to.equal(updateUser.result.email));

    it('SHOULD correct company password',
      () => expect(currrentState.user.password).to.equal(updateUser.result.password));

    describe('WHEN updateting the user API access token is succesfull', () => {
      const updateUserApiToken = {
        type: actions.UPDATE_API_ACCESS_TOKEN_USER_SUCCESS,
        result: {
          apiAccessToken: 'crappyToken'
        }
      };

      beforeEach(() => currrentState = reducer(currrentState, updateUserApiToken));

      it('SHOULD update the token correctly',
        () => expect(currrentState.user.apiAccessToken).to.equal(updateUserApiToken.result.apiAccessToken));

      it('SHOULD have the update in progress flag set to false',
        () => expect(currrentState.updatetingUserAPIAccessToken).to.equal(false));

      it('SHOULD have the error set to nothing',
        () => expect(currrentState.updateAPIAccessTokenError).to.equal(''));

      it('SHOULD maintain all other fields', () => {
        expect(currrentState.user.firstName).to.equal(updateUser.result.firstName);
        expect(currrentState.user.companyName).to.equal(updateUser.result.companyName);
        expect(currrentState.user.lastName).to.equal(updateUser.result.lastName);
      });
    });
  });


  describe('WHEN signing up', () => {
    const signUp = {
      type: actions.SIGN_UP,
    };
    beforeEach(() => {
      currrentState = reducer(currrentState, signUp);
    });

    it('SHOULD have signing up flag true', () => {
      expect(currrentState.signingUp).to.equal(true);
    });

    it('SHOULD set error to empty', () => {
      expect(currrentState.signUpError).to.equal('');
    });
  });

  describe('WHEN sign up failed', () => {
    const signUp = {
      type: actions.SIGN_UP_FAIL,
      error: 'it did not work'
    };

    beforeEach(() => {
      currrentState = reducer(currrentState, signUp);
    });

    it('SHOULD set the error message', () => {
      expect(currrentState.signUpError).to.equal(signUp.error);
    });

    it('SHOULD have signing up flag false', () => {
      expect(currrentState.signingUp).to.equal(false);
    });
  });

  describe('WHEN sign up is successfull', () => {
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

    it('SHOULD return the new user',
      () => expect(currrentState.user).to.not.be.undefined);

    it('SHOULD set error to empty', () => {
      expect(currrentState.signUpError).to.equal('');
    });

    it('SHOULD have signingUp flag set to false', () => {
      expect(currrentState.signingUp).to.equal(false);
    });

    it('SHOULD have the same email', () => {
      expect(currrentState.user.email).to.equal(signUp.result.email);
    });
  });
});
