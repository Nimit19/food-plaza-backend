import jwt from "jsonwebtoken";
import { Users } from "../entities";
import { AuthPayload } from "../dto/auth.dto";

const { JWT_SECRET_KEY } = process.env;

export const generateJwtToken = (payload: AuthPayload) => {
  return jwt.sign(payload, JWT_SECRET_KEY!, { expiresIn: "1d" });
};

export const validateJwtToken = () => {};
