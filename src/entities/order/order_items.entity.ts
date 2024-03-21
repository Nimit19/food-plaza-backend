import { Column, Double, Entity } from "typeorm";
import { Base } from "../base/base.entity";

@Entity({ name: "order_items" })
export class OrderItems extends Base {
  @Column({ name: "amount" })
  amount: Double;
}
