import { AppDataSource } from "../data-source";
import { STATUS_CODE } from "../constants";
import {
  FoodCategories,
  FoodItems,
  RestaurantFoodCategories,
} from "../entities";
import { Request, Response } from "express";

const { SUCCESS_STATUS_CODE, INTERNAL_SERVER_ERROR_STATUS_CODE } = STATUS_CODE;

export const addFoodCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName, isPopular } = req.body;

    const newCategory = new FoodCategories();
    newCategory.foodCategoryName = categoryName;
    newCategory.isPopular = isPopular;

    // Save the new category to the database
    const categoryRepo = AppDataSource.getRepository(FoodCategories);
    const addedCategory = await categoryRepo.save(newCategory);

    // Send success response
    res.status(SUCCESS_STATUS_CODE).json({
      category: addedCategory,
      message: "Food category added successfully",
    });
  } catch (error) {
    // Send error response
    console.error("Error adding food category:", error);
    res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: "Internal server error",
    });
  }
};

export const getPopularCategories = async (req: Request, res: Response) => {
  try {
    const categoryRepo = AppDataSource.getRepository(FoodCategories);

    const popularCategories = await categoryRepo.find({
      where: {
        isPopular: true,
      },
    });

    res.status(SUCCESS_STATUS_CODE).json(popularCategories);
  } catch (error) {
    console.error("Error adding food category:", error);
    res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: "Internal server error",
    });
  }
};

export const getFoodByCategory = async (req: Request, res: Response) => {
  try {
    const { id: categoryId } = req.params;

    const restaurantFoodCategoryRepo = AppDataSource.getRepository(
      RestaurantFoodCategories
    );

    const popularCategoriesWithFoodItem = await restaurantFoodCategoryRepo.find(
      {
        where: {
          foodCategories: {
            id: +categoryId,
          },
        },
        relations: {
          foodItems: true,
        },
      }
    );

    const filterFoodItems: FoodItems[] = popularCategoriesWithFoodItem.reduce(
      (prevState: FoodItems[], category) => {
        category.foodItems.forEach((foodItem: FoodItems) => {
          if (foodItem) {
            prevState.push(foodItem);
          }
        });
        return prevState;
      },
      []
    );
    res.status(SUCCESS_STATUS_CODE).json(filterFoodItems);
  } catch (error) {
    // Send error response
    console.error("Error adding food category:", error);
    res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({
      message: "Internal server error",
    });
  }
};
