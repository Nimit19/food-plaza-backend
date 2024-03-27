import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../base.entity";
import { Carts } from "./carts.enitity";
import { FoodItems } from "../food_items.enitity";

@Entity({ name: "cart_items" })
export class CartItems extends Base {
  @Column({ name: "quantity" })
  quantity: number;

  @ManyToOne(() => Carts, (carts) => carts.cartItems)
  @JoinColumn({
    name: "carts_id",
  })
  carts: Carts;

  @ManyToOne(() => FoodItems, (foodItems) => foodItems.cartItems)
  @JoinColumn({
    name: "food_items_id",
  })
  foodItems: FoodItems;
}
