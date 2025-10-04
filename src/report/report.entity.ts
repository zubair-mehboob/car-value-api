import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IReport } from './report.service';
import { User } from 'src/user/user.entity';

@Entity()
export class Report implements IReport {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  make: string;
  @Column()
  model: number;
  @Column()
  latitude: number;
  @Column()
  longitude: number;
  @Column()
  price: number;
  @Column()
  year: number;
  @Column()
  mileage: number;
  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @Column({ default: false })
  approved: boolean;
}
