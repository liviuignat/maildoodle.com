import co from 'co';
import { createUser, getUserByEmail } from './../user/userRepository';

export function login(email, password) {
  return co(function*() {
    const user = yield getUserByEmail(email);
    if (!user) {
      throw new Error('User does not exist.');
    }

    if (user.password !== password) {
      throw new Error('Incorrect password.');
    }

    delete user.password;

    return user;
  });
}

export function resetPassword() {
  return new Promise((resolve, reject) => {
    reject(new Error('Not yet implemented!'));
  });
}

export function signUp(email, password) {
  return co(function*() {
    const existingUser = yield getUserByEmail(email);
    if (existingUser) throw new Error('User already exists.');

    const user = yield createUser({email, password});
    if (!user) {
      throw new Error('Error creating user.');
    }

    delete user.password;

    return user;
  });
}
