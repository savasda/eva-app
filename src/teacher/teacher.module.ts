import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramEntity } from 'src/program/entities/program.entity';
import { TeacherEntity } from './entity/teacher.entity';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
	imports: [TypeOrmModule.forFeature([TeacherEntity, ProgramEntity])],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}
