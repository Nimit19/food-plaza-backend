import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/base.entity";
import { UserRole } from "../../constants";
import { Orders } from "../order/orders.enitity";

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
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @Column({ name: "profile_url" })
  profileUrl: string;

  @Column({ name: "is_email_varified" })
  isEmailVarified: boolean;

  @Column({ name: "is_phone_number_varified" })
  isPhoneNumberVarified: boolean;

  @Column("jsonb", { nullable: true })
  address: Object[];

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}
