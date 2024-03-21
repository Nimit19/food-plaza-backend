import { Column, Double, Entity } from "typeorm";
import { Base } from "../base/base.entity";
import { OrderStatus } from "../../constants";

@Entity({ name: "orders" })
export class Orders extends Base {
  @Column({})
  total_amount: Double;

  @Column({})
  toPay: Double;

  @Column({})
  date: Date;

  @Column({ type: "enum", enum: OrderStatus })
  orderStatus: OrderStatus;
}
