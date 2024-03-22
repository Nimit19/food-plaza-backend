import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../base/base.entity";
import { Restaurants } from "./restaurants.entity";
import { FoodCategories } from "../food_category/food_categories.enitity";
import { FoodItems } from "../food/food_items.enitity";

@Entity({ name: "restaurant_food_categories" })
export class RestaurantFoodCategories extends Base {
  @Column({ name: "category_name" })
  foodCategoryName: string;

  @ManyToOne(
    () => Restaurants,
    (restaurants) => restaurants.restaurantFoodCategories
  )
  restaurants: Restaurants;

  @ManyToOne(
    () => FoodCategories,
    (foodCategories) => foodCategories.restaurantFoodCategories
  )
  foodCategories: FoodCategories;

  @OneToMany(() => FoodItems, (foodItems) => foodItems.restaurantFoodCategories)
  foodItems: FoodItems[];
}
