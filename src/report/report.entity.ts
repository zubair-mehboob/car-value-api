import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IReport } from './report.service';

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
}
