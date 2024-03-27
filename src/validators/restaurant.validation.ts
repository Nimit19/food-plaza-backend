import Joi from "joi";

const feedbackMessages = {
  required: "is required",
  string: "must be a string",
  uri: "must be a valid URL",
  boolean: "must be a boolean value",
  number: "must be a number",
  imageUrlFormat: "must be a URL ending with .jpg, .jpeg, .png, or .gif",
};

const imageUrlSchema = Joi.string()
  .uri({ scheme: ["http", "https"] })
  .regex(/\.(jpg|jpeg|png|gif|pdf)$/)
  .messages({
    "string.base": feedbackMessages.string,
    "string.uri": feedbackMessages.uri,
    "string.pattern.base": feedbackMessages.imageUrlFormat,
  })
  .required();

export const restaurantValidation = Joi.object({
  shopName: Joi.string()
    .required()
    .messages({
      "any.required": `Shop name ${feedbackMessages.required}`,
    }),
  shopDescription: Joi.string()
    .required()
    .messages({
      "any.required": `Shop description ${feedbackMessages.required}`,
    }),
  shopLogoUrl: imageUrlSchema.required().messages({
    "any.required": `Shop logo URL ${feedbackMessages.required}`,
  }),
  shopBg1: imageUrlSchema.required().messages({
    "any.required": `Shop background 1 ${feedbackMessages.required}`,
  }),
  shopBg2: imageUrlSchema.required().messages({
    "any.required": `Shop background 2 ${feedbackMessages.required}`,
  }),
  shopBg3: imageUrlSchema.required().messages({
    "any.required": `Shop background 3 ${feedbackMessages.required}`,
  }),
  menuPage1: imageUrlSchema.required().messages({
    "any.required": `Menu page 1 ${feedbackMessages.required}`,
  }),
  menuPage2: imageUrlSchema.required().messages({
    "any.required": `Menu page 2 ${feedbackMessages.required}`,
  }),
  isOpen: Joi.boolean()
    .required()
    .messages({
      "any.required": `Is open ${feedbackMessages.required}`,
      "boolean.base": `Is open ${feedbackMessages.boolean}`,
    }),
  openingTime: Joi.string()
    .required()
    .messages({
      "any.required": `Opening time ${feedbackMessages.required}`,
      "string.base": `Opening time ${feedbackMessages.string}`,
    }),
  closingTime: Joi.string()
    .required()
    .messages({
      "any.required": `Closing time ${feedbackMessages.required}`,
      "string.base": `Closing time ${feedbackMessages.string}`,
    }),
  averageCost: Joi.string()
    .required()
    .messages({
      "any.required": `Average cost ${feedbackMessages.required}`,
      "string.base": `Average cost ${feedbackMessages.string}`,
    }),
  ratings: Joi.number()
    .required()
    .messages({
      "any.required": `Ratings ${feedbackMessages.required}`,
      "number.base": `Ratings ${feedbackMessages.number}`,
    }),
  address: Joi.object()
    .required()
    .messages({
      "any.required": `Address ${feedbackMessages.required}`,
    }),
  latitude: Joi.number()
    .required()
    .messages({
      "any.required": `Latitude ${feedbackMessages.required}`,
      "number.base": `Latitude ${feedbackMessages.number}`,
    }),
  longitude: Joi.number()
    .required()
    .messages({
      "any.required": `Longitude ${feedbackMessages.required}`,
      "number.base": `Longitude ${feedbackMessages.number}`,
    }),
});
