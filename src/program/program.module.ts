import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoModule } from 'src/seo/seo.module';
import { REPOSITORY } from 'src/shared/repository';
import { teacherSchema } from 'src/teacher/entity/teacher.entity';
import { ProgramEntity, programSchema } from './entities/program.entity';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
const slug = require('slug')

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
					schema.post('save', async function() {
						if(!this.alias && this.name) {
							this.alias = slug(this.name, {lower: true});
						}
					})
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
