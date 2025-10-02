import { Logger } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  private readonly logger = new Logger(User.name);
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    this.logger.log(`Inserted User with email: ${this.email}`);
  }

  @AfterUpdate()
  logUpdate() {
    this.logger.log(`Updated User with id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    this.logger.warn(`Removed User with id: ${this.id}`);
  }
}
