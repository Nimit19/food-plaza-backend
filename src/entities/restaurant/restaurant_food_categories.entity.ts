import { Column, Entity } from "typeorm";
import { Base } from "../base/base.entity";

@Entity({ name: "restaurant_food_categories" })
export class RestaurantFoodCategories extends Base {
  @Column({ name: "category_name" })
  foodCategoryName: string;
}
