import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SeoEntity extends Document {
	@Prop({
		type: String,
	})
	title: string;

	@Prop({
		type: String,
	})
	description: string;

	@Prop({type: [{
		type: String,
	}]})
	keywords: string;

}

export const seoSchema = SchemaFactory.createForClass(SeoEntity);
