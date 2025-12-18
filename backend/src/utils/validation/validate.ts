import { getMessage } from "../translation/getMessage";

type ValidationErrors = Record<string, string>;

export const validateFields = (
  data: Record<string, any>,
  requiredFields: string[],
  lang: string = "pt"
): ValidationErrors | null => {
  const errors: ValidationErrors = {};

  requiredFields.forEach((field) => {
    if (!data[field]) {
      errors[field] = getMessage(lang, "fieldRequired").replace(
        "{field}",
        field
      );
    }
  });

  return Object.keys(errors).length > 0 ? errors : null;
};
