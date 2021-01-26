import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity('user')
export class UserEntity {
	@ObjectIdColumn()
	_id: string;

	@CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
	updated: Date;
	
	@Column({
		type: 'text',
		unique: true
	})
	username: string;

	@Column()
	password: string;

	@BeforeInsert()
	async hasPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}

	toResponseObject(showToken: boolean = true) {
		const { _id, created, username, updated, token } = this;
		const responseObj = { _id, created, username, updated };
		if(showToken) {
			responseObj['token'] = token;
		} 
		return responseObj;
	}

	async	comparePassword(attempt: string) {
		return await bcrypt.compare(attempt, this.password);
	}

	private get token() {
		const {username, password} = this;
		return jwt.sign({
			username, password
		}, process.env.SECRET, {expiresIn: '7d'})
	}
	
}