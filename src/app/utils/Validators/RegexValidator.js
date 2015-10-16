export class RegexValidator {
  constructor(regex, message = 'Field is not valid') {
  }

  getIsValid(value) {
    return this.regex.test(value);
  }
}