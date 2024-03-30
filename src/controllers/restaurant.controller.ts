import { Request, Response } from "express";
import { CustomError } from "../utils/custom-error";
import { ERROR_MESSAGES, STATUS_CODE } from "../constants";
import {
  FoodCategories,
  FoodItems,
  RestaurantFoodCategories,
  Restaurants,
} from "../entities";
import { CoordinateType } from "../types";
import { Point } from "typeorm";
import { AppDataSource } from "../data-source";
import { restaurantValidation } from "../validators";

const {
  SUCCESS_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
} = STATUS_CODE;

const { _BadRequest } = ERROR_MESSAGES;

// ok
export const addRestaurantDetails = async (req: Request, res: Response) => {
  try {
    console.log("restaurant --> ", req.body);
    const isValidate = restaurantValidation.validate(req.body, {
      abortEarly: false,
    });

    if (isValidate.error) {
      throw new CustomError(isValidate.error.message, BAD_REQUEST_STATUS_CODE);
    }

    const {
      shopName,
      shopDescription,
      shopLogoUrl,
      shopBg1,
      shopBg2,
      shopBg3,
      menuPageName1,
      menuPage1,
      menuPageName2,
      menuPage2,
      isOpen,
      openingTime,
      closingTime,
      averageCost,
      ratings,
      address,
      latitude,
      longitude,
    } = req.body;

    const location: Point = {
      type: "Point",
      coordinates: [latitude, longitude],
    };

    let newRestaurant = new Restaurants();
    newRestaurant.shopName = shopName;
    newRestaurant.shopDescription = shopDescription;
    newRestaurant.shopLogoUrl = shopLogoUrl;
    newRestaurant.shopBg = {
      bg1: shopBg1,
      bg2: shopBg2,
      bg3: shopBg3,
    };

    newRestaurant.menuPage = [
      {
        manuPageName: menuPageName1,
        manuPageImage: menuPage1,
      },
      {
        manuPageName: menuPageName2,
        manuPageImage: menuPage2,
      },
    ];

    newRestaurant.isOpen = isOpen;
    newRestaurant.openingTime = openingTime;
    newRestaurant.closingTime = closingTime;
    newRestaurant.averageCost = averageCost;
    newRestaurant.ratings = ratings;
    newRestaurant.address = address;
    newRestaurant.location = location;

    const restaurantRepo = AppDataSource.getRepository(Restaurants);
    const addedRestaurant = await restaurantRepo.save(newRestaurant);
    res.status(SUCCESS_STATUS_CODE).send({
      restaurant: addedRestaurant,
      message: "Sucessfully restaurant ne add kari didhu chhe",
    });
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};

// ok
export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurantRepo = AppDataSource.getRepository(Restaurants);
    const restaurants = await restaurantRepo.find();

    res.status(SUCCESS_STATUS_CODE).send({
      restaurants: restaurants,
      message: "Sucessfully restaurants na data mali gaya chhe.",
    });
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};

// ok
export const getRestaurantById = async (req: Request, res: Response) => {
  const { id: restaurantId } = req.params;
  try {
    const restaurantRepo = AppDataSource.getRepository(Restaurants);
    const restaurants = await restaurantRepo.findOne({
      where: {
        id: Number(restaurantId),
      },
      relations: {
        foodItems: true,
        restaurantFoodCategories: true,
      },
    });

    res.status(SUCCESS_STATUS_CODE).send({
      restaurants: restaurants,
      message: "Sucessfully restaurants na data mali gaya chhe.",
    });
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};

// ok
export const addRestaurantFoodCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract necessary data from request body
    const { foodCategoryName, restaurantId, categoryId } = req.body;

    const restaurantRepo = AppDataSource.getRepository(Restaurants);
    const restaurants = await restaurantRepo.findOneBy({
      id: Number(restaurantId),
    });

    const categoriesRepo = AppDataSource.getRepository(FoodCategories);
    const category = await categoriesRepo.findOneBy({
      id: Number(categoryId),
    });

    // Create a new instance of RestaurantFoodCategories entity
    const newRestaurantCategory = new RestaurantFoodCategories();
    newRestaurantCategory.foodCategoryName = foodCategoryName;
    newRestaurantCategory.restaurants = restaurants!;
    newRestaurantCategory.foodCategories = category!;

    // Save the new restaurant food category to the database
    const restaurantCategoryRepository = AppDataSource.getRepository(
      RestaurantFoodCategories
    );
    const addedRestaurantCategory = await restaurantCategoryRepository.save(
      newRestaurantCategory
    );

    // Send success response
    res.status(SUCCESS_STATUS_CODE).json({
      restaurantCategory: addedRestaurantCategory,
      message: "Restaurant food category added successfully",
    });
  } catch (error) {
    // Send error response
    console.error("Error adding restaurant food category:", error);
    res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: "Internal server error",
    });
  }
};

export const getAllRestaurantsLogoAndName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Retrieve all restaurants with only shopName and shopLogoUrl fields
    const restaurantRepository = AppDataSource.getRepository(Restaurants);
    const restaurants = await restaurantRepository.find({
      select: ["shopName", "shopLogoUrl"],
    });

    // Send success response
    res.status(SUCCESS_STATUS_CODE).json({
      restaurants: restaurants,
      message: "Successfully retrieved restaurants' logo and name",
    });
  } catch (error) {
    // Send error response
    console.error("Error retrieving restaurants' logo and name:", error);
    res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: "Internal server error",
    });
  }
};

//
export const getRestaurantCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurantId } = req.body;

    const restaurantCategoryRepo = AppDataSource.getRepository(
      RestaurantFoodCategories
    );
    const restaurantCategories = await restaurantCategoryRepo.find({
      where: { id: restaurantId },
    });

    // Send success response
    res.status(SUCCESS_STATUS_CODE).json({
      restaurantCategories: restaurantCategories,
      message: "Successfully retrieved restaurant categories",
    });
  } catch (error) {
    // Send error response
    console.error("Error retrieving restaurant categories:", error);
    res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: "Internal server error",
    });
  }
};

export const getFoodByRestaurantCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract restaurantId and categoryId from request params
    const { restaurantId, categoryId } = req.params;

    // Retrieve food items based on restaurantId and categoryId
    const foodItemRepository = AppDataSource.getRepository(FoodItems);
    const foodItems = await foodItemRepository.find({
      where: {
        restaurants: { id: +restaurantId },
        restaurantFoodCategories: { id: +categoryId },
      },
    });

    // Send success response
    res.status(SUCCESS_STATUS_CODE).json({
      foodItems: foodItems,
      message: "Successfully retrieved food items by restaurant category",
    });
  } catch (error) {
    // Send error response
    console.error("Error retrieving food items by restaurant category:", error);
    res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: "Internal server error",
    });
  }
};
// Extra
export const searchRestaurant = () => {};
export const updateRestaurant = () => {};
export const removeRestaurant = () => {};
