import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IReport } from '../report.service';

export class ReportDTO implements IReport {
  @IsString()
  make: string;
  @IsNumber()
  model: number;
  @IsOptional()
  latitude: number;
  @IsOptional()
  longitude: number;
  @IsNumber()
  price: number;
  @IsNumber()
  year: number;
  @IsNumber()
  mileage: number;
}
