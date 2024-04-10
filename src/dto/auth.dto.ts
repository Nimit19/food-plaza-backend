import { Users } from "../entities";
import { UserPayload } from "./user.dto";

export type AuthPayload = UserPayload;

export type authInput = {
  fullName: string;
  email: string;
  password: string;
};
