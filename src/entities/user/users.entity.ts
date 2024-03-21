import { Column, Entity } from "typeorm";
import { Base } from "../base/base.entity";

@Entity({ name: "users" })
export class Users extends Base {
  @Column({ name: "full_name", nullable: false })
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: "user" })
  role: string;

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
}
