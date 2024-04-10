import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Base } from "../base.entity";
import { Users } from "../users.entity";
import { OrderItems } from "./order_items.entity";
import { Coupons } from "../coupons.enitity";
import { OrderState } from "../../constants";

@Entity({ name: "orders" })
export class Orders extends Base {
  @Column({ name: "order_data", type: "json" })
  orderDetails: Object;

  @Column({ name: "order_at" })
  date: Date;

  @Column({ name: "order_status", type: "enum", enum: OrderState })
  orderStatus: OrderState;

  @ManyToOne(() => Users, (users) => users.orders)
  @JoinColumn({ name: "user_id" })
  users: Users;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.orders)
  orderItems: OrderItems[];

  @OneToOne(() => Coupons)
  @JoinColumn({ name: "coupon_id" })
  coupons: Coupons;
}
