import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { programSchema } from 'src/program/entities/program.entity';
import { REPOSITORY } from 'src/shared/repository';
import { teacherSchema } from './entity/teacher.entity';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: REPOSITORY.TEACHER,
				useFactory: () => {
					const schema = teacherSchema;
          schema.pre('save',  async function () { 
						this.updated = new Date()
					});
          return schema;
        },
			},
			{
				name: REPOSITORY.PROGRAM,
				useFactory: () => {
					return programSchema;
				}
			}
		])
	],  
	controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}
