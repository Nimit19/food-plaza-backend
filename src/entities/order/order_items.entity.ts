import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Base } from "../base/base.entity";
import { Orders } from "./orders.enitity";
import { CartItems } from "../cart/cart_items.enitity";

@Entity({ name: "order_items" })
export class OrderItems extends Base {
  @Column({ name: "amount" })
  amount: Double;

  @ManyToOne(() => Orders, (orders) => orders.orderItems)
  orders: Orders;

  @OneToOne(() => CartItems)
  @JoinColumn()
  cartItems: CartItems;
}
