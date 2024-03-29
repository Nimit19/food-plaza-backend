import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { UserRole } from "../constants";
import { Orders } from "./order/orders.enitity";

@Entity({ name: "users" })
export class Users extends Base {
  @Column({ name: "full_name", nullable: false })
  fullName: string;

  @Column({ name: "email", nullable: false })
  email: string;

  @Column({ name: "password", nullable: false })
  password: string;

  @Column({
    name: "role",
    type: "enum",
    enum: UserRole,
    default: "Cutomer",
  })
  role: UserRole;

  @Column({ name: "phone_number", nullable: true, default: "null" })
  phoneNumber: string;

  @Column({ name: "profile_url" })
  profileUrl: string;

  @Column({ name: "is_email_varified" })
  isEmailVarified: boolean;

  @Column({ name: "is_phone_number_varified" })
  isPhoneNumberVarified: boolean;

  @Column("jsonb")
  address: Object[];

  @OneToMany(() => Orders, (order) => order.users)
  orders: Orders[];
}
