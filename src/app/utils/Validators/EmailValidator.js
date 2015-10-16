import { RegexValidator } from './RegexValidator';

const REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export class EmailValidator extends RegexValidator {
  constructor(message = 'Email is not valid') {
    super(REGEX, message);
  }

  getIsValid(value) {
    return super.getIsValid(value);
  }
}