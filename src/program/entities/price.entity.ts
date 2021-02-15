import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

@Schema()
export class PriceEntity extends Document {
	@Prop({
		type: Number,
	})
	for4: number;

	@Prop({
		type: Number,
	})
	for8: number;
}
export const priceSchema = SchemaFactory.createForClass(PriceEntity);
