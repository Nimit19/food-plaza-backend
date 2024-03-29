import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Base } from "./base.entity";
import { Weather } from "../constants";
import { RestaurantFoodCategories } from "./restaurant/restaurant_food_categories.entity";
import { CartItems } from "./cart/cart_items.enitity";
import { Restaurants } from "./restaurant/restaurants.entity";

@Entity({ name: "food_items" })
export class FoodItems extends Base {
  @Column({ name: "food_name" })
  foodName: string;

  @Column({ name: "image_url" })
  foodImageUrl: string;

  @Column({ name: "description" })
  foodDescription: string;

  @Column({ name: "available_quantity" })
  availableQuantity: number;

  @Column({ name: "price", type: "double precision" })
  price: number;

  @Column({ name: "is_popular_food" })
  isPopular: boolean;

  @Column({ name: "food_weather", type: "enum", enum: Weather })
  foodWeather: Weather;

  @Column({ name: "delivery_charge", type: "double precision" })
  deliveryCharge: Double;

  @Column({ name: "preparing_time" })
  preparingTime: string;

  @ManyToOne(() => Restaurants, (restaurants) => restaurants.foodItems, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "restaurant_id" })
  restaurants: Restaurants;

  @ManyToOne(
    () => RestaurantFoodCategories,
    (restaurantFoodCategories) => restaurantFoodCategories.foodItems,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "restaurant_food_category_id" })
  restaurantFoodCategories: RestaurantFoodCategories;

  @OneToMany(() => CartItems, (cartItems) => cartItems.foodItems)
  cartItems: CartItems[];
}
