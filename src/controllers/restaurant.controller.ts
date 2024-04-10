import { Request, Response } from "express";
import { _BadRequestError } from "../utils/custom-error";
import { STATUS_CODE } from "../constants";
import {
  FoodCategories,
  FoodItems,
  RestaurantFoodCategories,
  Restaurants,
} from "../entities";
import { Point } from "typeorm";
import { AppDataSource } from "../data-source";
import { restaurantValidation } from "../validators";

const { SUCCESS_STATUS_CODE, INTERNAL_SERVER_ERROR_STATUS_CODE } = STATUS_CODE;

export const createRestaurants = async (req: Request, res: Response) => {
  try {
    const isValidate = restaurantValidation.validate(req.body, {
      abortEarly: false,
    });

    if (isValidate.error) {
      throw new _BadRequestError(isValidate.error.message);
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
        menuPageName: menuPageName1,
        menuPageImage: menuPage1,
      },
      {
        menuPageName: menuPageName2,
        menuPageImage: menuPage2,
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
      message: "Restaurant successfully added.",
    });
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurantRepo = AppDataSource.getRepository(Restaurants);
    const restaurants = await restaurantRepo.find({
      relations: {
        restaurantFoodCategories: true,
        foodItems: {
          restaurantFoodCategories: true,
        },
      },
    });

    res.status(SUCCESS_STATUS_CODE).send({
      restaurants: restaurants,
      message: "Successfully retrieved restaurant data.",
    });
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  const { id: restaurantId } = req.params;
  try {
    const restaurantRepo = AppDataSource.getRepository(Restaurants);
    const restaurants = await restaurantRepo.findOne({
      where: {
        id: Number(restaurantId),
      },
      relations: {
        foodItems: {
          restaurantFoodCategories: true,
        },
        restaurantFoodCategories: true,
      },
    });

    res.status(SUCCESS_STATUS_CODE).send(restaurants);
  } catch (err: any) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: (err as Error).message,
    });
  }
};

export const addRestaurantFoodCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { foodCategoryName, restaurantId, categoryId } = req.body;

    const restaurantRepo = AppDataSource.getRepository(Restaurants);
    const restaurants = await restaurantRepo.findOneBy({
      id: Number(restaurantId),
    });

    const categoriesRepo = AppDataSource.getRepository(FoodCategories);
    const category = await categoriesRepo.findOneBy({
      id: Number(categoryId),
    });

    const newRestaurantCategory = new RestaurantFoodCategories();
    newRestaurantCategory.foodCategoryName = foodCategoryName;
    newRestaurantCategory.restaurants = restaurants!;
    newRestaurantCategory.foodCategories = category!;

    const restaurantCategoryRepository = AppDataSource.getRepository(
      RestaurantFoodCategories
    );
    const addedRestaurantCategory = await restaurantCategoryRepository.save(
      newRestaurantCategory
    );

    res.status(SUCCESS_STATUS_CODE).json({
      restaurantCategory: addedRestaurantCategory,
      message: "Restaurant food category added successfully.",
    });
  } catch (error) {
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
    const restaurantRepository = AppDataSource.getRepository(Restaurants);
    const restaurants = await restaurantRepository.find({
      select: ["id", "shopName", "shopLogoUrl"],
    });

    res.status(SUCCESS_STATUS_CODE).json(restaurants);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: "Internal server error",
    });
  }
};

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

    res.status(SUCCESS_STATUS_CODE).json({
      restaurantCategories: restaurantCategories,
      message: "Successfully retrieved restaurant categories",
    });
  } catch (error) {
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
    const { restaurantId, categoryId } = req.params;

    const foodItemRepository = AppDataSource.getRepository(FoodItems);
    const foodItems = await foodItemRepository.find({
      where: {
        restaurants: { id: +restaurantId },
        restaurantFoodCategories: { id: +categoryId },
      },
    });

    res.status(SUCCESS_STATUS_CODE).json({
      foodItems: foodItems,
      message: "Successfully retrieved food items by restaurant category",
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: "Internal server error",
    });
  }
};

// Extra
export const searchRestaurant = () => {};
export const updateRestaurant = () => {};
export const removeRestaurant = () => {};
