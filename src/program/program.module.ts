import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoModule } from 'src/seo/seo.module';
import { REPOSITORY } from 'src/shared/repository';
import { teacherSchema } from 'src/teacher/entity/teacher.entity';
import { ProgramEntity, programSchema } from './entities/program.entity';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';

@Module({
  imports: [
		SeoModule,
		MongooseModule.forFeatureAsync([
			{
				name: REPOSITORY.PROGRAM,
				useFactory: () => {
					const schema = programSchema;
          schema.pre('save',  async function () { 
						this.updated = new Date();
					});
          return schema;
        },
			},
			{
				name: REPOSITORY.TEACHER,
				useFactory: () => {
					return teacherSchema;
				}
			}
		])
	],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
