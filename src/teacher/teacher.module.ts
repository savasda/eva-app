import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { programSchema } from 'src/program/entities/program.entity';
import { SeoModule } from 'src/seo/seo.module';
import { REPOSITORY } from 'src/shared/repository';
import { teacherSchema } from './entity/teacher.entity';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
const slug = require('slug')

@Module({
	imports: [
		SeoModule,
		MongooseModule.forFeatureAsync([
			{
				name: REPOSITORY.TEACHER,
				useFactory: () => {
					const schema = teacherSchema;
          schema.pre('save',  async function () { 
						this.updated = new Date();
						if(!this.alias && this.name) {
							this.alias = slug(this.name, {lower: true});
						}
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
