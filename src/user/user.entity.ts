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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('user inserted' + this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('user removed' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('user updated' + this.id);
  }
}
