import { Column, Entity } from "typeorm";
import { Base } from "../base/base.entity";

@Entity({ name: "cart_items" })
export class CartItems extends Base {
  @Column({ name: "quantity" })
  quantity: number;
}
