import { ERROR_MESSAGES, STATUS_CODE } from "../constants";

const {
  BAD_REQUEST_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  CONFLICT_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
} = STATUS_CODE;

// const {
//   _BadRequest,
//   _Conflict,
//   _NotFound,
//   _InternalServerErrorMessage,
//   _Unauthorized,
// } = ERROR_MESSAGES;

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message || "Internal Server Error");
    this.statusCode = statusCode || 500;
  }
}

// Bad Request Error
export class _BadRequestError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message || "Bad Request");
    this.statusCode = BAD_REQUEST_STATUS_CODE || 404;
  }
}

// Unauthorized Error
export class _UnauthorizedError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message || "Unauthorized");
    this.statusCode = UNAUTHORIZED_STATUS_CODE;
  }
}

// Not Found Error
export class _NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message || "Not found");
    this.statusCode = NOT_FOUND_STATUS_CODE;
  }
}

// Confilict Error
export class _ConflictError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message || "Conflict");
    this.statusCode = CONFLICT_STATUS_CODE;
  }
}

// Internal Server Error
export class _InternalServerError extends Error {
  statusCode: number;
  constructor(message?: string) {
    super(message || "Internal Server Error");
    this.statusCode = INTERNAL_SERVER_ERROR_STATUS_CODE;
  }
}
