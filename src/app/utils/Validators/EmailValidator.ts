import { RegexValidator } from './RegexValidator';

const REGEX: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export class EmailValidator extends RegexValidator {
  constructor(public message: string = 'Email is not valid') {
    super(REGEX, message);
  }

  getIsValid(value: string): boolean {
    return super.getIsValid(value);
  }
}