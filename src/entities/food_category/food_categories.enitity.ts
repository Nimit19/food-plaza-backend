import { Column, Entity } from "typeorm";
import { Base } from "../base/base.entity";

@Entity({ name: "food_categories" })
export class FoodCategories extends Base {
  @Column()
  foodCategoryName: string;
}
