import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TeacherEntity } from './entity/teacher.entity';
import { ObjectID } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { REPOSITORY } from 'src/shared/repository';
import { TeacherDTO } from './entity/teacher.dto';
import { ProgramEntity } from 'src/program/entities/program.entity';

@Injectable()
export class TeacherService {

	constructor(
		@InjectModel(REPOSITORY.PROGRAM) private programRepository: Model<ProgramEntity>,
		@InjectModel(REPOSITORY.TEACHER) private teacherRepository: Model<TeacherEntity>
	) {}


	async getAll(): Promise<TeacherEntity[]> {
		const teachers =  await this.teacherRepository.find()
		.populate({
			path: 'programs',
			select: { 'teachers': 0},
		}).exec();
		return teachers;
	}

	async getOne(id: string): Promise<TeacherEntity> {
		const teacher = await this.teacherRepository.findOne({
			_id: id
		}).populate(
			{
				path: 'programs',
				select: { 'teachers': 0},
			}
		).exec();
		if(!teacher) {
			throw new HttpException('Teacher does not exist', HttpStatus.NOT_FOUND)
		}
		return teacher;
	}

	async create(data: TeacherDTO): Promise<TeacherEntity> {
		const teacher = await this.teacherRepository.create(data);
		return teacher;
	}



  async update(id: string, data: Partial<TeacherDTO>): Promise<TeacherEntity> {
		const { name, description, programIds } = data;
		let programs = [];
		
		if(programIds?.length) {
			programs = await this.programRepository.find(
				{_id: {$in: programIds},
			});
		}
	
		const teacher = await this.teacherRepository.findByIdAndUpdate(
			{_id: id},
			{ 
				$set: { programs: programs.map(t => t.id)},
				name,
				description 
			},
			{ new: true, useFindAndModify: false }
		);

		if(programIds?.length) {
			programs.forEach(t => t.updateOne({
				$addToSet: {teachers: teacher.id}
			}).exec())
		} else {
	
			await this.programRepository.find(
				{ programs: { $exists: true, $not: {$size: 0} } }
			).updateMany({
				$pull: {programs: teacher.id}
			});

		}

		return teacher;
  }

	// async pushProgram(programIds: string[], teacherId: string): Promise<TeacherEntity> {

	// 	const teacher = await this.teacherRepository.findOne({
	// 		where: {
	// 			_id: new ObjectID(teacherId)
	// 		},
	// 		relations: ['programs'],
	// 	});

	// 	const programs = await this.programsRepository.find({
	// 		where: {
	// 			_id: {$in: programIds.map(id => new ObjectID(id))}
	// 		}
	// 	});

	// 	await this.teacherRepository.findOneAndUpdate({
	// 		_id: new ObjectID(teacherId)
	// 	}, {
	// 		$addToSet: {programs: {$each: programs}}
	// 	}, {
	// 		upsert:true 
	// 	});

	// 	programs.forEach(async program => {
	// 		await this.programsRepository.findOneAndUpdate({
	// 			_id: new ObjectID(program._id)
	// 		}, {
	// 			$addToSet: {teachers: teacher}
	// 		},  {
	// 			upsert:true
	// 		})
	// 	});

	// 	return teacher;

	// }
}
