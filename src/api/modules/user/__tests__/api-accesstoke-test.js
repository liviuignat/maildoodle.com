import co from 'co';
import {expect} from 'chai';
import {
  request,
  cleanup,
  createUser
} from './../../../supertest';

const that = {};
that.getUserDataRequest = (user) => request
  .get('/api/user/me')
  .set('Content-type', 'application/json')
  .set('X-Api-Token', `${user.apiAccessToken}`);

describe('WEHN api access token tests', () => {

  beforeEach((done) => {
    co(function*() {
      yield cleanup();
      that.currentUser = yield createUser({
        email: 'liviu@ignat.email',
        password: 'password'
      });
    }).then(done)
      .catch(done);
  });

  it('SHOULD have the apiAccessToken in the user',
    () => expect(that.currentUser.apiAccessToken).not.to.be.undefined);

  describe('WHEN requesting user data with a correct apiAccessToken', () => {
    it('SHOULD make the request with success',
      (done) => that.getUserDataRequest(that.currentUser).expect(200).end(done));
  });

  describe('WHEN requesting user data with a correct apiAccessToken', () => {
    beforeEach(() => that.currentUser.apiAccessToken += 'fake');
    it('SHOULD make the request with success',
      (done) => that.getUserDataRequest(that.currentUser).expect(401).end(done));
  });
});
