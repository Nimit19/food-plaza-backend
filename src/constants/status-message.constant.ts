export const SUCCESS_MESSAGES = {
  _SuccessOk: () => "The request was successful.",
  _Created: (str: string) => `${str} was created successfully.`,
};

export const ERROR_MESSAGES = {
  _BadRequest: () =>
    "The request could not be understood due to invalid syntax.",
  _Unauthorized: (str: string) => `You are not authorized to ${str}.`,
  _NotFound: (str: string) => `${str} not found.`,
  _Conflict: (str: string) => `${str} already exists.`,
  _InternalServerError: () => "Internal Server Error.",
};
