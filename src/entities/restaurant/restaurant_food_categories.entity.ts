import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../base.entity";
import { Restaurants } from "./restaurants.entity";
import { FoodCategories } from "../food_categories.enitity";
import { FoodItems } from "../food_items.enitity";

@Entity({ name: "restaurant_food_categories" })
export class RestaurantFoodCategories extends Base {
  @Column({ name: "category_name" })
  foodCategoryName: string;

  @ManyToOne(
    () => Restaurants,
    (restaurants) => restaurants.restaurantFoodCategories,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "restaurants_id" })
  restaurants: Restaurants;

  @ManyToOne(
    () => FoodCategories,
    (foodCategories) => foodCategories.restaurantFoodCategories,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "food_categories_id" })
  foodCategories: FoodCategories;

  @OneToMany(() => FoodItems, (foodItems) => foodItems.restaurantFoodCategories)
  foodItems: FoodItems[];
}
