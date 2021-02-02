import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './entity/user.dto';
import { UserEntity } from './entity/user.entity';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { REPOSITORY } from 'src/shared/repository';
@Injectable()
export class UserService {

	constructor(@InjectModel(REPOSITORY.USER) private userRepository: Model<UserEntity>) {}


	async showAll() {
		const users =	await this.userRepository.find().exec();
		if(users?.length) {
			return users.map(user => this.toResponseObject(user, false))
		}
	}

	async login(data: UserDTO){
		const { username, password} = data;
		const user = await this.userRepository.findOne({username}).exec();
		if(!user) {
			throw new HttpException(`User with name ${username} doesn't exist`, HttpStatus.BAD_REQUEST)
		}
		const passIsCorrect = await bcrypt.compare(password, user.hash);
		if(!passIsCorrect) {	
			throw new HttpException('Username/password is incorrect', HttpStatus.BAD_REQUEST)
		}
		return this.toResponseObject(user);
	}

	async register(data: UserDTO) {
		const { username } = data;
		let user = await this.userRepository.findOne({username}).exec();
		if(user) {
			throw new HttpException(`User with name ${username} already exist`, HttpStatus.BAD_REQUEST)
		} else {
			user = await this.userRepository.create(data);
			await this.userRepository.create(user);
		}
		return user;
	}

	private toResponseObject(data: UserEntity, showToken: boolean = true) {
		const { _id, created, username, updated } = data;
		const responseObj = { _id, created, username, updated };
		if(showToken) {
			responseObj['token'] = this.token(data);
		} 
		return responseObj;
	}

	private token(data: UserEntity) {
		const {username, password} = data;
		return jwt.sign({
			username, password
		}, process.env.SECRET, {expiresIn: '7d'})
	}
}
