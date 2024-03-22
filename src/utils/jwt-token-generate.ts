import jwt from "jsonwebtoken";
import { Users } from "../entities";

const { JWT_SECRET_KEY } = process.env;

export const generateJwtToken = (payload: Users) => {
  return jwt.sign({ id: payload.id }, JWT_SECRET_KEY!, { expiresIn: "1d" });
};
