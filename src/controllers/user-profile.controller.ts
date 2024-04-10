import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entities";
import { STATUS_CODE } from "../constants";
import { _NotFoundError } from "../utils/custom-error";
const { SUCCESS_STATUS_CODE, INTERNAL_SERVER_ERROR_STATUS_CODE } = STATUS_CODE;

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const authUser = req.user;

    if (!authUser) {
      throw new _NotFoundError("User was not found");
    }

    const usersRepo = AppDataSource.getRepository(Users);

    const foundUser = await usersRepo.findOne({
      where: { id: Number(authUser._id) },
    });

    if (!foundUser) {
      throw new _NotFoundError("User Profile was not found");
    }

    res.status(SUCCESS_STATUS_CODE).send(foundUser);
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
      throw new _NotFoundError("User was not found");
    }

    const usersRepo = AppDataSource.getRepository(Users);
    const user = await usersRepo.findOne({
      where: { id: Number(authUser._id) },
    });

    if (!user) {
      throw new _NotFoundError("User Profile was not found");
    }

    user.fullName = fullName || user.fullName;
    user.profileUrl = profileUrl || user.profileUrl;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;

    const updatedUser = await usersRepo.save(user);

    res.status(SUCCESS_STATUS_CODE).send({
      userProfile: updatedUser,
      message: "User profile updated successfully",
    });
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};
