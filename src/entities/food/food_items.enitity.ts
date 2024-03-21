import { Column, Double, Entity } from "typeorm";
import { Base } from "../base/base.entity";
import { Weather } from "../../constants";

@Entity({ name: "food_items" })
export class FoodItems extends Base {
  @Column({})
  foodName: string;

  @Column({})
  foodImageUrl: string;

  @Column({})
  foodDiscription: string;

  @Column({})
  availableQuantity: number;

  @Column({})
  price: Double;

  @Column({})
  foodTag: string;

  @Column({ type: "enum", enum: Weather })
  foodWeather: Weather;

  @Column({})
  deliveryCharge: Double;

  @Column({})
  preparingTime: Date;
}
