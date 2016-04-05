import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  minLength,
  repeatPasswordValidation
} from 'universal/helpers/validation';

export const changePasswordValidator = memoize(10)(createValidator({
  oldPassword: [required],
  newPassword: [required, minLength(6)],
  repeatNewPassword: [required, repeatPasswordValidation('newPassword')]
}));
