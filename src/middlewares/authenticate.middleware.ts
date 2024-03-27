import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { AppDataSource } from "../data-source";
import { STATUS_CODE } from "../constants/status-code.constant";
import { ERROR_MESSAGES } from "../constants";
import { AuthPayload } from "../dto/auth.dto";
dotenv.config();

const { JWT_SECRET_KEY } = process.env;

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
      .json({ message: _Unauthorized("manupulate the Data") });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .json({ message: _Unauthorized("manupulate the data") });
  }
  const decode = jwt.verify(token, JWT_SECRET_KEY!) as AuthPayload;

  if (!decode) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .json({ message: _Unauthorized("manupulate the event") });
  }

  req.user = decode;

  next();
};

// export const authorization = (roles: string[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const authRepo = AppDataSource.getRepository(Auth);
//     const auth = await authRepo.findOne({
//       where: { id: req.body.user },
//     });

//     console.log(auth);

//     if (!auth) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     if (!roles.includes(auth.role)) {
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     next();
//   };
// };
