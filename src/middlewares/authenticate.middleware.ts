import { NextFunction, Request, Response } from "express";
import { STATUS_CODE } from "../constants/status-code.constant";
import { ERROR_MESSAGES } from "../constants";
import { AuthPayload } from "../dto/auth.dto";
import { validateJwtToken } from "../utils/jwt.utility";

const { UNAUTHORIZED_STATUS_CODE } = STATUS_CODE;
const { _Unauthorized } = ERROR_MESSAGES;

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .json({ message: _Unauthorized("manipulate the Data") });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .json({ message: _Unauthorized("manipulate the data") });
  }

  const decodedToken = validateJwtToken(token);

  if (!decodedToken) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .json({ message: _Unauthorized("manipulate the ") });
  }

  req.user = decodedToken;

  next();
};
