import { RequiredStringValidator } from './RequiredStringValidator';

export class PasswordValidator {
  constructor(message = 'Password is required') {
    this.message = message;
  }

  getIsValid(value) {
    const requiredStringValidator = new RequiredStringValidator();

    if (!requiredStringValidator.getIsValid(value)) {
      return false;
    }

    if (value.length < 6) {
      this.message = 'Password should be greater than 6 characters';
      return false;
    }

    return true;
  }
}