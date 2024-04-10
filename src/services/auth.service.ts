import bcrypt from "bcrypt";

import { UserRole } from "../constants";
import { AppDataSource } from "../data-source";
import { Users } from "../entities";
import { _ConflictError, _UnauthorizedError } from "../utils/custom-error";
import { generateJwtToken } from "../utils/jwt.utility";
import { Roles } from "../entities/role.entity";

export const signUpUser = async (
  name: string,
  email: string,
  password: string,
  role?: string
) => {
  const authRepo = AppDataSource.getRepository(Users);
  const roleRepo = AppDataSource.getRepository(Roles);

  const foundUser = await authRepo.find({
    where: { email: email },
  });

  if (foundUser.length > 0) {
    throw new _ConflictError("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: Users = new Users();
  newUser.fullName = name;
  newUser.email = email;
  newUser.password = hashedPassword;

  if (!role) {
    const userRole = await roleRepo.findOne({
      where: { role_name: UserRole.CUSTOMER },
    });
    newUser.role = userRole!;
  } else {
    const userRole = await roleRepo.findOne({
      where: { role_name: role },
    });
    newUser.role = userRole!;
  }

  const createdUser = await authRepo.save(newUser);

  const token = generateJwtToken({
    _id: createdUser.id,
    email: createdUser.email,
    name: createdUser.fullName,
  });

  return {
    createdUser,
    token,
  };
};

export const logInUser = async (email: string, password: string) => {
  const authRepo = AppDataSource.getRepository(Users);
  const foundUser = await authRepo.findOne({ where: { email: email } });

  if (!foundUser) {
    throw new _UnauthorizedError("Invalid credentials.");
  }

  const isSame = await bcrypt.compare(password, foundUser.password);

  if (!isSame) {
    throw new _UnauthorizedError("Invalid credentials.");
  }

  const token = generateJwtToken({
    _id: foundUser.id,
    email: foundUser.email,
    name: foundUser.fullName,
  });

  return {
    foundUser,
    token,
  };
};
