import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramEntity } from 'src/program/entities/program.entity';
import { JoinProgramDTO } from 'src/shared/entity/join-program.dto';
import { MongoRepository } from 'typeorm';
import { TeacherDTO } from './entity/teacher.dto';
import { TeacherEntity } from './entity/teacher.entity';
import { TeacherRO } from './entity/teacher.response';
import { ObjectID } from 'mongodb';

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
		console.log(id)
		const teacher = await this.teacherRepository.findOne({
			where: {
				_id: new ObjectID(id)
			}, 
			relations: ['programs']
		});
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

	async pushProgram(programIds: string[], teacherId: string): Promise<TeacherEntity> {

		const teacher = await this.teacherRepository.findOne({
			where: {
				_id: new ObjectID(teacherId)
			},
			relations: ['programs'],
		});

		const programs = await this.programsRepository.find({
			where: {
				_id: {$in: programIds.map(id => new ObjectID(id))}
			}
		});

		await this.teacherRepository.findOneAndUpdate({
			_id: new ObjectID(teacherId)
		}, {
			$addToSet: {programs: {$each: programs}}
		}, {
			upsert:true 
		});

		programs.forEach(async program => {
			await this.programsRepository.findOneAndUpdate({
				_id: new ObjectID(program._id)
			}, {
				$addToSet: {teachers: teacher}
			},  {
				upsert:true
			})
		});

		return teacher;

	}
}
