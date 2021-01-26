import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserDTO } from './entity/user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>,
	){}

	async showAll() {
		const users =	await this.userRepository.find();
		if(users?.length) {
			return users.map(user => user.toResponseObject())
		}

	}

	async login(data: UserDTO){
		const { username, password} = data;
		const user = await this.userRepository.findOne({username});
		const passIsCorrect = await user.comparePassword(password);

		if(!user || !passIsCorrect) {	
			throw new HttpException('Username/password is incorrect', HttpStatus.BAD_REQUEST)
		}
	
		return user.toResponseObject();
	}

	async register(data: UserDTO) {
		const { username } = data;
		let user = await this.userRepository.findOne({username});
		if(user) {
			throw new HttpException(`User with name ${username} already exist`, HttpStatus.BAD_REQUEST)
		} else {
			user = await this.userRepository.create(data);
			await this.userRepository.save(user);
		}
		return user.toResponseObject()
	}

}
