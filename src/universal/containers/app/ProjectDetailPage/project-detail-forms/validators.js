import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  minLength
} from './../../../../helpers/validation';

export const addTemplateFormValidator = memoize(10)(createValidator({
  name: [required, minLength(6)],
  description: []
}));
