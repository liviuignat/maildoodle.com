export class RequiredStringValidator implements IValidator {
  constructor(public message: string = 'Field is required') {
  }

  getIsValid(value: any): boolean {
    return !!value;
  }
}