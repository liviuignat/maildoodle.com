import co from 'co';
import {expect} from 'chai';
import {
  request,
  cleanup,
  createUser
} from './../../../supertest';

describe('userModule tests', () => {
  const that = {};

  beforeEach((done) => {
    co(function*() {
      yield cleanup();
      that.currentUser = yield createUser({
        email: 'alina@mail.com',
        password: 'password'
      });
    }).then(done)
      .catch(done);
  });

  describe('WHEN requesting a new api access token', () => {
    const newApiAccessTokenRequest = (user) => request
      .put('/api/user/me/apiaccesstoken')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${user.sessionToken}`);

    it('SHOULD return status okay (200)',
      (done) => newApiAccessTokenRequest(that.currentUser).expect(200).end(done));

    describe('WHEN update api token request is finished', () => {
      beforeEach((done) => newApiAccessTokenRequest(that.currentUser).end((err, res) => {
        if(err) return done(err);
        that.updatedUser = res.body;
        done();
      }));

      it('SHOULD have a user in the update response', () => {
        expect(that.updatedUser).not.to.be.undefined;
        expect(that.updatedUser).not.to.equal(null);
      });

      it('SHOULD have an existing access token',
        () => expect(that.updatedUser.apiAccessToken).not.to.be.undefined);

      it('SHOULD have a new api access',
        () => expect(that.updatedUser.apiAccessToken).not.to.equal(that.currentUser.apiAccessToken));
    });
  });
});
