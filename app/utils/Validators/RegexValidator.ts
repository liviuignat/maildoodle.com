export class RegexValidator implements IValidator {
  constructor(private regex: RegExp, public message: string = 'Field is not valid') {
  }

  getIsValid(value: string): boolean {
    return this.regex.test(value);
  }
}