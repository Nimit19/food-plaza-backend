import { Request, Response } from "express";
import { STATUS_CODE } from "../constants";
import { _BadRequestError, CustomError } from "../utils/custom-error";
import { authValidation } from "../validators";
import { logInUser, signUpUser } from "../services";
import { authInput } from "../dto/auth.dto";

const { SUCCESS_STATUS_CODE, INTERNAL_SERVER_ERROR_STATUS_CODE } = STATUS_CODE;

export const userSignUpHandler = async (req: Request, res: Response) => {
  const { fullName, email, password } = <authInput>req.body;

  try {
    const isValidate = authValidation.validate(req.body);

    if (isValidate.error) {
      throw new _BadRequestError(isValidate.error.message);
    }

    const { createdUser, token } = await signUpUser(fullName, email, password);

    res.status(SUCCESS_STATUS_CODE).send({
      user: createdUser,
      accessToken: token,
      message: "You have successfully signed up.",
    });
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};

export const userLogInHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { foundUser, token } = await logInUser(email, password);

    res.status(SUCCESS_STATUS_CODE).send({
      user: foundUser,
      accessToken: token,
      message: "You have successfully logged in.",
    });
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};
