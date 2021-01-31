import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserEntity extends Document{

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
		type: String,
		unique: true,
		index: true
	})
	username: string;

	@Prop({
		type: String,
	})
	password: string;

	@Prop({
		type: String,
	})
	hash: string
}



export const UserSchema = SchemaFactory.createForClass(UserEntity);
