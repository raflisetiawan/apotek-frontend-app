import { ValidationRuleWithParams } from '@vuelidate/core';
import {
  required,
  email,
  minLength,
  helpers,
  sameAs,
} from '@vuelidate/validators';

const useRequired = (): ValidationRuleWithParams => {
  return helpers.withMessage('Harus di isi', required);
};

const useMinLength = (lengthNumber: number): ValidationRuleWithParams => {
  return helpers.withMessage(
    `Password harus lebih dari ${lengthNumber} karakter`,
    minLength(lengthNumber)
  );
};

const useEmail = (): ValidationRuleWithParams => {
  return helpers.withMessage('Email tidak valid', email);
};

const useConfirmPassword = (passwordModel: string) => {
  return sameAs(passwordModel);
};

export { useRequired, useMinLength, useEmail, useConfirmPassword };
