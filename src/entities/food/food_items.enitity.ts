import { Column, Double, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../base/base.entity";
import { Weather } from "../../constants";
import { Restaurants } from "../restaurant/restaurants.entity";
import { RestaurantFoodCategories } from "../restaurant/restaurant_food_categories.entity";
import { CartItems } from "../cart/cart_items.enitity";

@Entity({ name: "food_items" })
export class FoodItems extends Base {
  @Column({ name: "food_name" })
  foodName: string;

  @Column({ name: "image_url" })
  foodImageUrl: string;

  @Column({ name: "discription" })
  foodDiscription: string;

  @Column({ name: "available_quantity" })
  availableQuantity: number;

  @Column({ name: "price" })
  price: number;

  @Column({ name: "food_tag" })
  foodTag: string;

  @Column({ name: "food_weather", type: "enum", enum: Weather })
  foodWeather: Weather;

  @Column({ name: "delivery_charge" })
  deliveryCharge: number;

  @Column({ name: "preparing_time" })
  preparingTime: Date;

  @ManyToOne(() => Restaurants, (restaurants) => restaurants.foodItems)
  restaurants: Restaurants;

  @ManyToOne(
    () => RestaurantFoodCategories,
    (restaurantFoodCategories) => restaurantFoodCategories.foodItems
  )
  restaurantFoodCategories: RestaurantFoodCategories;

  @OneToMany(() => CartItems, (cartItems) => cartItems.foodItems)
  cartItems: CartItems[];
}
