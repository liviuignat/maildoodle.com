import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  minLength
} from 'universal/helpers/validation';

export const layoutDetailFormValidator = memoize(10)(createValidator({
  name: [required, minLength(6)],
  value: []
}));
