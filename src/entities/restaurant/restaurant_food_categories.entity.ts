import { Column, Entity } from "typeorm";
import { Base } from "../base/base.entity";

@Entity({ name: "restaurant_food_categories" })
export class RestaurantFoodCategories extends Base {
  @Column()
  categoryName: string;
}
