import Joi from "joi";

export const authValidation = Joi.object({
  fullName: Joi.string().required().messages({
    "any.required": "name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .max(20)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least {#limit} characters long",
      "string.max":
        "Password must be less than or equal to {#limit} characters long",
      "string.pattern.base":
        "Password must be contain at least one upper case, at least one lower case, at least one digit and one special character",
      "any.required": "Password is required",
    }),
});
