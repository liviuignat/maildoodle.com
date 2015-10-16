export class RegexValidator {
  constructor(regex, message = 'Field is not valid') {
    this.regex = regex;
    this.message = message;
  }

  getIsValid(value) {
    return this.regex.test(value);
  }
}