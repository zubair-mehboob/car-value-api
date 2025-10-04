import { IsBoolean } from 'class-validator';
import { IApproval } from '../report.service';

export class ApproveReportDTO implements IApproval {
  @IsBoolean()
  approved: boolean;
}
