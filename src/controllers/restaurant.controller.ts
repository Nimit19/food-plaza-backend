import { Request, Response } from "express";
import { CustomError } from "../utils/custom-error";
import { ERROR_MESSAGES, STATUS_CODE } from "../constants";

const {
    SUCCESS_STATUS_CODE,
    BAD_REQUEST_STATUS_CODE,
    INTERNAL_SERVER_ERROR_STATUS_CODE,
    NOT_FOUND_STATUS_CODE,
  } = STATUS_CODE;
  
  const { _Conflict, _NotFound } = ERROR_MESSAGES;

export const addRestaurantDetails = (req: Request, res: Response) => {


  if (.length > 0) {
    throw new CustomError(_Conflict("Email"), CONFLICT_STATUS_CODE);
  }
};

export const getAllRestaurants = () => {};

export const getRestaurant = () => {};

export const searchRestaurant = () => {};

// Extra
export const updateRestaurant = () => {};
export const removeRestaurant = () => {};
