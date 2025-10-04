import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  IApproval,
  IReport,
  IReportService,
  REPORT_SERVICE,
} from './report.service';
import { ReportDTO } from './dto/create-report.dto';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { Authenticated } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetReportDTO } from './dto/get-report.dto';

@Authenticated()
@UseInterceptors(ResponseInterceptor)
@Controller('reports')
export class ReportController {
  constructor(
    @Inject(REPORT_SERVICE) private readonly reportService: IReportService,
  ) {}
  @Get()
  getReport(@Query() query: Partial<ReportDTO>) {
    return this.reportService.getAll(query);
  }

  @Serialize(GetReportDTO)
  @Post()
  createReport(@Body() dto: ReportDTO, @CurrentUser() user: User) {
    console.log({ user }, 'inside create report controller');
    return this.reportService.create(dto, user);
  }

  @Patch('/:id')
  updateReport(@Param('id') id: number, @Body() dto: Partial<IReport>) {
    return this.reportService.update(id, dto);
  }

  @Patch('/:id')
  approved(@Param('id') id: number, @Body() dto: IApproval) {
    this.reportService.approval(id, dto);
  }
}
