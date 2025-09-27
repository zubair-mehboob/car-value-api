import { Injectable } from '@nestjs/common';
export const REPORT_SERVICE = Symbol('IReportService');
export interface IReport {
  make: string;
  model: number;
  latitude: number;
  longitude: number;
  price: number;
  year: number;
  mileage: number;
}
export interface IApproval {
  approved: boolean;
}
export interface IReportService {
  getAll(): string[];
  getOne(dto: Partial<IReport>): string;
  create(dto: IReport): IReport;
  update(dto: Partial<IReport>): IReport;
  approval(dto: IApproval);
}
@Injectable()
export class ReportService implements IReportService {
  getAll(): string[] {
    return ['abc', 'xyz'];
  }
  getOne(): string {
    return 'abc';
  }
  create(dto: Partial<IReport>): IReport {
    throw new Error('Method not implemented.');
  }
  update(dto: Partial<IReport>): IReport {
    throw new Error('Method not implemented.');
  }
  approval(dto: IApproval) {
    throw new Error('Method not implemented.');
  }
}
