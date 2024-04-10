import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { FoodItems, RestaurantFoodCategories, Restaurants } from "../entities";
import { Weather } from "../constants";

export const addFoodItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      foodName,
      foodImageUrl,
      foodDescription,
      availableQuantity,
      price,
      isPopular,
      foodWeather,
      deliveryCharge,
      preparingTime,
      restaurantId,
      restaurantFoodCategoryId,
    } = req.body;

    const restaurantRepo = AppDataSource.getRepository(Restaurants);
    const restaurants = await restaurantRepo.findOneBy({
      id: Number(restaurantId),
    });

    const restaurantCategoryRepo = AppDataSource.getRepository(
      RestaurantFoodCategories
    );
    const category = await restaurantCategoryRepo.findOneBy({
      id: Number(restaurantFoodCategoryId),
    });

    const newFoodItem = new FoodItems();
    newFoodItem.foodName = foodName;
    newFoodItem.foodImageUrl = foodImageUrl;
    newFoodItem.foodDescription = foodDescription;
    newFoodItem.availableQuantity = availableQuantity;
    newFoodItem.price = price;
    newFoodItem.isPopular = isPopular;
    newFoodItem.foodWeather = foodWeather;
    newFoodItem.deliveryCharge = deliveryCharge;
    newFoodItem.preparingTime = preparingTime;
    newFoodItem.restaurants = restaurants!;
    newFoodItem.restaurantFoodCategories = category!;

    const foodItemRepo = AppDataSource.getRepository(FoodItems);

    const addedFoodItem = await foodItemRepo.save(newFoodItem);

    res
      .status(201)
      .json({ message: "Food item added successfully", data: addedFoodItem });
  } catch (error) {
    console.error("Error adding food item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFoodItemsByWeather = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { weather } = req.query;

    const foodItemRepo = AppDataSource.getRepository(FoodItems);

    if (weather) {
      const foodItems = await foodItemRepo.find({
        where: { foodWeather: weather as Weather },
        relations: {
          restaurants: true,
          restaurantFoodCategories: true,
        },
      });
      res.status(200).json(foodItems);
    }
  } catch (error) {
    console.error("Error retrieving food items by weather:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchFoodItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { search } = req.query;
    const foodItemRepo = AppDataSource.getRepository(FoodItems);
    const foodItems = await foodItemRepo
      .createQueryBuilder("foodItem")
      .leftJoinAndSelect("foodItem.restaurants", "restaurants")
      .where("LOWER(foodItem.foodName) LIKE LOWER(:query)", {
        query: `%${search}%`,
      })
      // .orWhere("LOWER(foodItem.foodDescription) LIKE LOWER(:query)", { query: `%${search}%` })
      .orWhere("LOWER(restaurants.shopName) LIKE LOWER(:query)", {
        query: `%${search}%`,
      })
      .getMany();

    res.status(200).json(foodItems);
  } catch (error) {
    console.error("Error searching for food items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
