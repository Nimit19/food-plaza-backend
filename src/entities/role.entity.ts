import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Base } from "./base.entity";

@Entity("roles")
export class Roles extends Base {
  @Column({ type: "varchar", nullable: false })
  role_name: string;
}
