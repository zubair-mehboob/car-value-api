import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
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

import { Authorized } from 'src/guards/authorized.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { ApproveReportDTO } from './dto/approve-report.dto';

@Authenticated()
@UseInterceptors(ResponseInterceptor)
@Controller('reports')
export class ReportController {
  constructor(
    @Inject(REPORT_SERVICE) private readonly reportService: IReportService,
  ) {}
  @Authorized()
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

  @Authorized()
  @Patch('/apprvoed/:id')
  approved(@Param('id') id: number, @Body() dto: ApproveReportDTO) {
    return this.reportService.approval(id, dto);
  }
}
