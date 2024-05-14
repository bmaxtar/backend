import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Student } from "./IStudent"

@Entity()
export class Todo implements Student {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  fullName: string
  @Column()
  class: string
  @Column()
  birth: Date
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @Column()
  edit: boolean
}
