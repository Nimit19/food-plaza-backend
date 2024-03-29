import { Column, Entity, OneToMany, Point } from "typeorm";
import { Base } from "../base.entity";
import { RestaurantFoodCategories } from "./restaurant_food_categories.entity";
import { FoodItems } from "../food_items.enitity";

@Entity({ name: "restaurants" })
export class Restaurants extends Base {
  @Column({ name: "shop_name" })
  shopName: string;

  @Column({ name: "shop_description" })
  shopDescription: string;

  @Column({ name: "shop_logo_url" })
  shopLogoUrl: string;

  @Column({ name: "shop_bg", type: "jsonb" })
  shopBg: Object;

  @Column({ name: "menu_page", type: "jsonb" })
  menuPage: Object[];

  @Column({ name: "is_open" })
  isOpen: boolean;

  @Column({ name: "opening_time" })
  openingTime: string;

  @Column({ name: "closing_time" })
  closingTime: string;

  @Column({ name: "average_cost" })
  averageCost: string;

  @Column({ name: "ratings", type: "double precision" })
  ratings: number;

  @Column({
    name: "location",
    type: "geography",
    spatialFeatureType: "Point",
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @Column("jsonb", { name: "address", nullable: true })
  address: Object[];

  @OneToMany(
    () => RestaurantFoodCategories,
    (restaurantFoodCategories) => restaurantFoodCategories.restaurants
  )
  restaurantFoodCategories: RestaurantFoodCategories[];

  @OneToMany(() => FoodItems, (foodItems) => foodItems.restaurants)
  foodItems: FoodItems[];
}
