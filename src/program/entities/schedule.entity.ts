import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

@Schema()
export class ScheduleEntity extends Document {
	@Prop({
		type: Number,
	})
	day: number;

	@Prop({
		type: String,
	})
	start: string;

	@Prop({
		type: String,
	})
	end: string;
}
export const scheduleSchema = SchemaFactory.createForClass(ScheduleEntity);
