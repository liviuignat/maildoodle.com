import { RequiredStringValidator } from './RequiredStringValidator';

export  class PasswordValidator implements IValidator {
  constructor(public message: string = 'Password is required') {
  }

  getIsValid(value: string): boolean {
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