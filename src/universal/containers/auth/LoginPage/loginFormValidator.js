import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  minLength,
  email
} from './../../../helpers/validation';

export const loginFormValidator = memoize(10)(createValidator({
  email: [required, email],
  password: [required, minLength(6)]
}));
