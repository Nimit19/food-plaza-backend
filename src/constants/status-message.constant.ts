export const SUCCESS_MESSAGES = {
  _SuccessOk: () => "The request was successful.",
  _Created: (str: string) => `${str} was created successfully.`,
};

export const ERROR_MESSAGES = {
  _BadRequest: (message?: string) => message || "Bad request",
  _Unauthorized: (str: string) => `You are not authorized to ${str}.`,
  _NotFound: (str: string) => `${str} is not found.`,
  _Conflict: (str: string) => `${str} already exists.`,
  _InternalServerErrorMessage: () => "Internal Server Error.",
};
