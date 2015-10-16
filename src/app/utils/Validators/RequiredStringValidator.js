export class RequiredStringValidator {
  constructor(message = 'Field is required') {
    this.message = message;
  }

  getIsValid(value) {
    return !!value;
  }
}