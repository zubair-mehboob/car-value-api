import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { Observable } from 'rxjs';
import { ReportDTO } from './dto/create-report.dto';
import { User } from 'src/user/user.entity';
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
  getAll(query: Partial<ReportDTO>): Promise<Report[]>;
  getOne(query: Partial<ReportDTO>): Promise<Report>;
  create(dto: ReportDTO, user: User): Promise<Report>;
  update(id: number, dto: Partial<ReportDTO>): Promise<Report>;
  approval(id: number, dto: IApproval);
}
@Injectable()
export class ReportService implements IReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  async getOne(query: Partial<ReportDTO>): Promise<Report> {
    return await this.repo.findOne({ where: query });
  }
  async create(dto: ReportDTO, user: User): Promise<Report> {
    const report = await this.repo.create(dto);
    report.user = user;
    console.log({ user, report }, 'this user is gonna save');
    const res = await this.repo.save(report);
    return res;
  }
  async update(id: number, dto: Partial<ReportDTO>): Promise<Report> {
    const exisitingReport = await this.repo.findOneBy({ id });
    if (!exisitingReport)
      throw new NotFoundException(`Report with id ${id} not found`);
    Object.assign(exisitingReport, dto);
    return await this.repo.save(exisitingReport);
  }
  async approval(id: number, dto: IApproval) {
    const exisitingReport = await this.repo.findOneBy({ id });
    if (!exisitingReport)
      throw new NotFoundException(`Report with id ${id} not found`);
    exisitingReport.approved = dto.approved;
    return await this.repo.save(exisitingReport);
  }
  async getAll(query: Partial<ReportDTO>): Promise<Report[]> {
    return await this.repo.find({ where: query });
  }
}
