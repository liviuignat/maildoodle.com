export class TextFieldData {
  constructor(data) {
    if (data) {
      this.value = data.value || this.value;
      this.error = data.error || this.error;
      this.validators = data.validators || this.validators;
    }
  }

  setValue(value) {
    this.value = value;
    return this;
  }

  setError(message) {
    this.error = message;
    return this;
  }

  removeError() {
    this.error = '';
    return this;
  }

  reset() {
    this.error = '';
    this.value = '';
    return this;
  }
}