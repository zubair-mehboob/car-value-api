import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IReport } from '../report.service';

export class ReportDTO implements IReport {
  @IsString()
  make: string;
  @IsNumber()
  model: number;
  @IsLatitude()
  latitude: number;
  @IsLongitude()
  longitude: number;
  @IsNumber()
  price: number;
  @IsNumber()
  year: number;
  @IsNumber()
  mileage: number;
}
