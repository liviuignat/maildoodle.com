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

  describe('WHEN requesting an update on the user\'s personal data', () => {
    that.getUserDataRequest = (user) => request
      .get('/api/user/me')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${user.authToken}`);

    that.updateUserDataRequest = (user) => request
      .put('/api/user/me')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${user.authToken}`)
      .send(user);

    it('SHOULD return status okay (200)',
      (done) => that.updateUserDataRequest(that.currentUser).expect(200).end(done));

    describe('WHEN update user request is finished', () => {
      beforeEach((done) => {
        that.currentUser.firstName = 'Alina';
        that.currentUser.lastName = 'Ignat';
        that.currentUser.companyName = 'gogule';

        that.updateUserDataRequest(that.currentUser).end((err,res) => {
          if(err) return done(err);

          that.updatedUser = res.body;
          done();
        });
      });

      it('SHOULD contain objectId',
        () => expect(that.updatedUser.objectId).to.not.be.undefined);

      it('SHOULD update the user first name',
        () => expect(that.updatedUser.firstName).to.equal('Alina'));

      it('SHOULD update the user last name',
        () => expect(that.updatedUser.lastName).to.equal('Ignat'));

      it('SHOULD update the user company name',
        () => expect(that.updatedUser.companyName).to.equal('gogule'));

      describe('WHEN getting the user by id', () => {
        beforeEach(done => {
          that.getUserDataRequest(that.currentUser).end((err,res) => {
            if(err) return done(err);

            that.updatedUserGet = res.body;
            done();
          });
        });

        it('SHOULD have the same user as the update response',
          () => expect(that.updatedUserGet).to.deep.equal(that.updatedUserGet));
      });
    });
  });

  describe('WHEN requesting a new api access token', () => {
    const newApiAccessTokenRequest = (user) => request
      .put('/api/user/me/apiaccesstoken')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${user.authToken}`);

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
