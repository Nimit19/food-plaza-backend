import { Column, Double, Entity } from "typeorm";
import { Base } from "../base/base.entity";
import { Weather } from "../../constants";

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
  price: Double;

  @Column({ name: "food_tag" })
  foodTag: string;

  @Column({ name: "food_weather", type: "enum", enum: Weather })
  foodWeather: Weather;

  @Column({ name: "delivery_charge" })
  deliveryCharge: Double;

  @Column({ name: "preparing_time" })
  preparingTime: Date;
}
