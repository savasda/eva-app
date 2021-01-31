import { ProgramEntity, programSchema } from "src/program/entities/program.entity";
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { REPOSITORY } from "src/shared/repository";
@Schema()
export class TeacherEntity extends Document {
	@Prop({
		type: String,
	})
	name: string;

	@Prop({
		type: String,
	})
	description: string;

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

}

export const teacherSchema = SchemaFactory.createForClass(TeacherEntity);
