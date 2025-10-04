import { Expose, Transform } from 'class-transformer';
import { ReportDTO } from './create-report.dto';

export class GetReportDTO {
  @Expose()
  id: number;
  @Expose()
  make: string;
  @Expose()
  model: number;
  @Expose()
  latitude: number;
  @Expose()
  longitude: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
