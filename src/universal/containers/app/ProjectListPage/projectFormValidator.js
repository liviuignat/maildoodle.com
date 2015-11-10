import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  minLength
} from './../../../helpers/validation';

export const projectFormValidator = memoize(10)(createValidator({
  identifier: [required, minLength(6)],
  name: [required, minLength(6)],
  description: []
}));
