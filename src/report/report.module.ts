import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { REPORT_SERVICE, ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportController],
  providers: [
    {
      provide: REPORT_SERVICE,
      useClass: ReportService,
    },
  ],
})
export class ReportModule {}
