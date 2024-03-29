import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from "typeorm";

@Entity()
export class Base {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @CreateDateColumn({
    select: false,
    name: "created_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Timestamp;

  @UpdateDateColumn({
    select: false,
    name: "updated_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Timestamp;
}
