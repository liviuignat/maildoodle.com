import memoize from 'lru-memoize';
import {
  createValidator,
  required
} from 'universal/helpers/validation';

export const promoteTemplateToProductionValidator = memoize(10)(createValidator({
  commitMessage: [required]
}));
