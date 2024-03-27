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

  @Column({ name: "shop_bg_1" })
  shopBg1: string;

  @Column({ name: "shop_bg_2" })
  shopBg2: string;

  @Column({ name: "shop_bg_3" })
  shopBg3: string;

  @Column({ name: "menu_page_1" })
  menuPage1: string;

  @Column({ name: "menu_page_2" })
  menuPage2: string;

  @Column({ name: "is_open" })
  isOpen: boolean;

  @Column({ name: "opening_time" }) //  TODO: Change the database Name
  openingTime: string;

  @Column({ name: "closing_time" })
  closingTime: string;

  @Column({ name: "average_cost" })
  averageCost: string;

  @Column({ name: "ratings" })
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
