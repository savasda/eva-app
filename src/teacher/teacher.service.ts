import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramEntity } from 'src/program/entities/program.entity';
import { MongoRepository } from 'typeorm';
import { TeacherDTO } from './entity/teacher.dto';
import { TeacherEntity } from './entity/teacher.entity';
import { TeacherRO } from './entity/teacher.response';

@Injectable()
export class TeacherService {
	constructor(
		@InjectRepository(TeacherEntity)
		private readonly teacherRepository: MongoRepository<TeacherEntity>,
		@InjectRepository(ProgramEntity)
    private readonly programsRepository: MongoRepository<ProgramEntity>,
	){}


	async getAll(): Promise<TeacherRO[]> {
		const teachers =  await this.teacherRepository.find();
		return teachers;
	}

	async getOne(id: string): Promise<TeacherRO> {
		const teacher = await this.teacherRepository.findOne(id);
		if(!teacher) {
			throw new HttpException('Teacher does not exist', HttpStatus.NOT_FOUND)
		}
		return teacher;
	}

	async create(data: TeacherDTO): Promise<TeacherRO> {
		const teacher = await this.teacherRepository.create(data);
		await this.teacherRepository.save(teacher);
		return teacher;
	}
}
