import { Schema, ZodError } from 'zod';

export class SchemaError extends Error {
  isError: boolean;
  fieldErrors: { [field: string]: string | number } = {};

  constructor(message: string, field?: { [field: string]: string | number }) {
    super(message);
    this.isError = true;
    Object.keys(field || {}).forEach((f) => {
      this.fieldErrors[f] = (field || {})[f];
    });
  }
}

export type FormErrors = Record<string, ZodError>;

export type ValidationResult = {
  isValid: boolean;
  formErrors?: FormErrors;
};

export const validateSchema = <T>(schema: Schema, formData: T): ValidationResult => {
  try {
    schema.parse(formData);
    return { isValid: true, formErrors: {} };
  } catch (err) {
    const zodError = err as ZodError;
    return {
      isValid: false,
      formErrors: zodError.errors?.reduce((amount, current) => {
        return { ...amount, [current.path[0]]: current };
      }, {}),
    };
  }
};
