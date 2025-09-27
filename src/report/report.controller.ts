import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  IApproval,
  IReport,
  IReportService,
  REPORT_SERVICE,
} from './report.service';
import { ReportDTO } from './dto/create-report.dto';

@Controller('reports')
export class ReportController {
  constructor(
    @Inject(REPORT_SERVICE) private readonly reportService: IReportService,
  ) {}
  @Get()
  getReport(@Query() query: Partial<ReportDTO>) {
    console.log({ query });
    return this.reportService.getOne(query);
  }

  @Post()
  createReport(@Body() dto: ReportDTO) {
    this.reportService.create(dto);
  }

  @Patch()
  updateReport(@Body() dto: Partial<IReport>) {
    this.reportService.update(dto);
  }

  @Patch()
  approved(@Body() dto: IApproval) {
    this.reportService.approval(dto);
  }
}
