import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Base {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
