export class TextFieldData implements IFormFieldData {
  public value = '';
  public error = '';
  public validators: IValidator[] = [];

  constructor(data: IFormFieldDataInput) {
    if (data) {
      this.value = data.value || this.value;
      this.error = data.error || this.error;
      this.validators = data.validators || this.validators;
    }
  }

  setValue(value: string): TextFieldData {
    this.value = value;
    return this;
  }

  setError(message: string): TextFieldData {
    this.error = message;
    return this;
  }

  removeError(): TextFieldData {
    this.error = '';
    return this;
  }

  reset(): TextFieldData {
    this.error = '';
    this.value = '';
    return this;
  }
}