import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { TeacherEntity, teacherSchema } from 'src/teacher/entity/teacher.entity';
import { REPOSITORY } from 'src/shared/repository';

@Schema()
export class ProgramEntity extends Document {
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
	
	@Prop({type: [
		{
			type: Types.ObjectId,
			ref: REPOSITORY.TEACHER,
			default: [],
		}
	]})
	teachers: TeacherEntity[]

}

export const programSchema = SchemaFactory.createForClass(ProgramEntity);
