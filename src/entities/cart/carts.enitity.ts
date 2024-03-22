import { Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Base } from "../base/base.entity";
import { CartItems } from "./cart_items.enitity";
import { Users } from "../user/users.entity";

@Entity({ name: "carts" })
export class Carts extends Base {
  @OneToMany(() => CartItems, (cartItems) => cartItems.carts)
  cartItems: CartItems[];

  @OneToOne(() => Users)
  @JoinColumn()
  users: Users;
}
