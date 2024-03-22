import bcrypt from "bcrypt";

import { ERROR_MESSAGES, STATUS_CODE } from "../../constants";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities";
import { CustomError } from "../../utils/custom-error";
import { generateJwtToken } from "../../utils/jwt-token-generate";

const { CONFLICT_STATUS_CODE, UNAUTHORIZED_STATUS_CODE } = STATUS_CODE;

const { _Conflict } = ERROR_MESSAGES;

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  const authRepo = AppDataSource.getRepository(Users);

  const foundUser = await authRepo.find({ where: { email: email } });

  if (foundUser.length > 0) {
    throw new CustomError(_Conflict("Email"), CONFLICT_STATUS_CODE);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: Users = new Users();
  newUser.fullName = name;
  newUser.email = email;
  newUser.password = hashedPassword;
  const createdUser = await authRepo.save(newUser);

  const token = generateJwtToken(createdUser);

  return {
    createdUser,
    token,
  };
};

export const logInUser = async (email: string, password: string) => {
  const authRepo = AppDataSource.getRepository(Users);
  const foundUser = await authRepo.findOne({ where: { email: email } });

  if (!foundUser) {
    throw new CustomError("Invalid Credentials!", UNAUTHORIZED_STATUS_CODE);
  }

  const isSame = await bcrypt.compare(password, foundUser.password);

  if (!isSame) {
    throw new CustomError("Invalid Credentials!", UNAUTHORIZED_STATUS_CODE);
  }

  const token = generateJwtToken(foundUser);

  return {
    foundUser,
    token,
  };
};
