import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { TeacherEntity } from 'src/teacher/entity/teacher.entity';
import { REPOSITORY } from 'src/shared/repository';
import { SeoEntity } from 'src/shared/entity/seo.entity';
import { PriceEntity } from './price.entity';
import { ScheduleEntity } from './schedule.entity';
@Schema()
export class ProgramEntity extends Document {
	@Prop({
		type: String,
		unique : true, 
		required : true, 
		dropDups: true	
	})
	name: string;

	@Prop({
		type: String,
	})
	description: string;

	@Prop({
		type: String,
		index: true
	})
	alias: string;

	@Prop({
		type: Date, 
		default: Date.now
	})
  created: Date;

  @Prop({
		type: Date, 
		default: Date.now
	})
	updated: Date;
	
	@Prop({type: [
		{
			type: Types.ObjectId,
			ref: REPOSITORY.TEACHER,
			default: [],
		}
	]})
	teachers: TeacherEntity[];

	@Prop({
		type: [{
			type: Types.ObjectId,
			ref: REPOSITORY.SCHEDULE,
			default: []
		}]
	})
	scheduls: string[]

	@Prop({
		type: Types.ObjectId,
		ref: REPOSITORY.SEO
	})
	seo: SeoEntity

	@Prop({
		type: String
	})
	imagePath: string;

	@Prop({
		type: Types.ObjectId,
		ref: REPOSITORY.PRICE
	})
	price: PriceEntity

}

export const programSchema = SchemaFactory.createForClass(ProgramEntity);
