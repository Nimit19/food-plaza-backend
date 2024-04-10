import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Orders } from "./order/orders.entity";
import { Roles } from "./role.entity";
import { addressInput } from "../dto/user.dto";

@Entity({ name: "users" })
export class Users extends Base {
  @Column({ name: "full_name", nullable: false })
  fullName: string;

  @Column({ name: "email", nullable: false })
  email: string;

  @Column({ name: "password", nullable: false })
  password: string;

  @ManyToOne(() => Roles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "role_id" })
  role: Roles;

  @Column({ name: "phone_number", nullable: true, default: "null" })
  phoneNumber: string;

  @Column({ name: "profile_url" })
  profileUrl: string;

  @Column({ name: "is_email_verified" })
  isEmailVerified: boolean;

  @Column({ name: "is_phone_number_verified" })
  isPhoneNumberVerified: boolean;

  @Column("jsonb")
  address: Object;

  @OneToMany(() => Orders, (order) => order.users)
  orders: Orders[];

  get addressOfUser(): addressInput[] {
    return JSON.parse(this.address.toString());
  }
}
