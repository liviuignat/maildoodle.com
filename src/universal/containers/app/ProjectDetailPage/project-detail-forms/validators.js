import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  minLength
} from 'universal/helpers/validation';

export const addTemplateFormValidator = memoize(10)(createValidator({
  name: [required, minLength(6)],
  description: []
}));

export const addLayoutFormValidator = memoize(10)(createValidator({
  name: [required, minLength(6)]
}));
