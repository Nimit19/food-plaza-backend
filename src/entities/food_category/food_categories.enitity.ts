import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../base/base.entity";
import { RestaurantFoodCategories } from "../restaurant/restaurant_food_categories.entity";

@Entity({ name: "food_categories" })
export class FoodCategories extends Base {
  @Column({ name: "food_category_name" })
  foodCategoryName: string;

  @OneToMany(
    () => RestaurantFoodCategories,
    (restaurantFoodCategories) => restaurantFoodCategories.foodCategories
  )
  restaurantFoodCategories: RestaurantFoodCategories[];
}
