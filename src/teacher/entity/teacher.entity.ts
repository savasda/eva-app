import { ProgramEntity, programSchema } from "src/program/entities/program.entity";
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { REPOSITORY } from "src/shared/repository";
import { SeoEntity } from "src/shared/entity/seo.entity";
@Schema()
export class TeacherEntity extends Document {
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
		index: true,
		unique: true
	})
	alias: string;

	@Prop({
		type: Date, 
		default: Date.now
	})
  created: Date;

  @Prop({
		type: Date
	})
	updated: Date;
	
  @Prop({
		type: [
			{
				type: [Types.ObjectId],
				ref: REPOSITORY.PROGRAM,		
				default: []
			}
		]
	})
	programs: ProgramEntity[]


	@Prop({
		type: Types.ObjectId,
		ref: REPOSITORY.SEO
	})
	seo: SeoEntity

}

export const teacherSchema = SchemaFactory.createForClass(TeacherEntity);
