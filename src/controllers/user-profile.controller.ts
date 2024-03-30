import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entities";
import { ERROR_MESSAGES, STATUS_CODE } from "../constants";
import { CustomError } from "../utils/custom-error";
const {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
} = STATUS_CODE;

const { _Conflict, _NotFound } = ERROR_MESSAGES;

export const getUserProfile = async (req: Request, res: Response) => {
  // const { id: userId } = req.params;

  try {
    const authUser = req.user;

    if (!authUser) {
      throw new CustomError(_NotFound("User Not Found"), NOT_FOUND_STATUS_CODE);
    }

    const usersRepo = AppDataSource.getRepository(Users);

    const foundUser = await usersRepo.findOne({
      where: { id: Number(authUser._id) },
    });

    if (!foundUser) {
      throw new CustomError(_NotFound("User Profile"), NOT_FOUND_STATUS_CODE);
    }

    res.status(SUCCESS_STATUS_CODE).send({
      userProfile: foundUser,
      message: "Mali gay chhe user Profile",
    });
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};
export const updateUserProfile = async (req: Request, res: Response) => {
  const { fullName, profileUrl, phoneNumber, address }: Users = req.body;

  try {
    const authUser = req.user;

    if (!authUser) {
      throw new CustomError(_NotFound("User Not Found"), NOT_FOUND_STATUS_CODE);
    }

    const usersRepo = AppDataSource.getRepository(Users);
    const user = await usersRepo.findOne({
      where: { id: Number(authUser._id) },
    });

    if (!user) {
      throw new CustomError(_NotFound("User Profile"), NOT_FOUND_STATUS_CODE);
    }

    user.fullName = fullName || user.fullName;
    user.profileUrl = profileUrl || user.profileUrl;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;

    const updatedUser = await usersRepo.save(user);

    res.status(SUCCESS_STATUS_CODE).send({
      userProfile: updatedUser,
      message: "User Profile Update thay gay chhe",
    });
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};
