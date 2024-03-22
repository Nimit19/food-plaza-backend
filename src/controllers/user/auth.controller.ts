import { Request, Response } from "express";
import { STATUS_CODE } from "../../constants";
import { CustomError } from "../../utils/custom-error";
import { authValidation } from "../../validators";
import { logInUser, signUpUser } from "../../services";

const {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} = STATUS_CODE;

export const userSignUpHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const isValidate = authValidation.validate(req.body);

    if (isValidate.error) {
      throw new CustomError(isValidate.error.message, BAD_REQUEST_STATUS_CODE);
    }

    const { createdUser, token } = await signUpUser(name, email, password);

    res.status(SUCCESS_STATUS_CODE).send({
      user: createdUser,
      token: token,
      message: "You are successfully signed up...",
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
      token: token,
      message: "You are Successfully logged in...",
    });
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};
