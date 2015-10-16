class FormValidator {
  validate(formData) {
    let allValidatorsAreValid = true;

    Object.keys(formData).forEach((key) => {
      let currentFieldIsValid = true;
      const formFieldData = formData[key];
      const hasAnyValidator = formFieldData && formFieldData.validators && formFieldData.validators.length;

      if (hasAnyValidator) {
        for (let i = 0; i < formFieldData.validators.length; i++) {
          const validator = formFieldData.validators[i];
          const isValid = validator.getIsValid(formFieldData.value);

          if (!isValid) {
            formFieldData.error = validator.message;
            currentFieldIsValid = false;
            allValidatorsAreValid = false;
            break;
          }
        }

        if (currentFieldIsValid) {
          formFieldData.error = '';
        }
      }
    });

    return {
      isValid: allValidatorsAreValid,
      formData: formData
    };
  }
}

export * from './PasswordValidator';
export * from './RequiredStringValidator';
export * from './RegexValidator';
export * from './EmailValidator';
export const formValidator = new FormValidator();
