import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProgramDTO } from './entities/program.dto';
import { ProgramEntity } from './entities/program.entity';
import { MESSAGE } from '../shared/messages';
import { InjectModel } from '@nestjs/mongoose';
import { REPOSITORY } from 'src/shared/repository';
import { Model } from 'mongoose';
import { TeacherEntity } from 'src/teacher/entity/teacher.entity';
import { SeoService } from 'src/seo/seo.service';
const slug = require('slug')

@Injectable()
export class ProgramService {
	constructor(
		private seoService: SeoService,
		@InjectModel(REPOSITORY.PROGRAM) private programRepository: Model<ProgramEntity>,
		@InjectModel(REPOSITORY.TEACHER) private teacherRepository: Model<TeacherEntity>
	) {}


  async getAllPrograms(): Promise<Array<ProgramEntity>> {
		return await this.programRepository.find()
			.populate({
				path: 'teachers',
				select: { 'programs': 0},
			})
			.populate('seo')
			.exec();

  }

  async create(data: ProgramDTO) : Promise<ProgramEntity>{
		const { seo } = data;
		const program = await this.programRepository.create(data);
		const seoEntity = await this.seoService.create(seo);
	
		program.updateOne({
			$set: {
				seo: seoEntity._id,
				alias: slug(program.name, {lower: true})
			}
		})
		.populate('seo')
		.exec();

    return program;
  }

  async read(id: string): Promise<ProgramEntity> {
		const program = await this.programRepository.findById(id)
		.populate(
			{
				path: 'teachers',
				select: { 'programs': 0},
			}
		).populate('seo').exec();

		if(!program) {
			throw new HttpException(MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return program;
  }

  async update(id: string, data: Partial<ProgramDTO>): Promise<ProgramEntity> {
		const { name, description, teacherIds, imagePath } = data;
		let teachers = [];
		
		if(teacherIds?.length) {
			teachers = await this.teacherRepository.find(
				{_id: {$in: teacherIds},
			});
		}
	
		const program = await this.programRepository.findByIdAndUpdate(
			{_id: id},
			{ 
				$set: { teachers: teachers.map(t => t.id)},
				name,
				description,
				imagePath
			},
			{ new: true, useFindAndModify: false }
		);

		if(teacherIds?.length) {
			teachers.forEach(t => t.updateOne({
				$addToSet: {programs: program.id}
			}).exec())
		} else {
	
			await this.teacherRepository.find(
				{ programs: { $exists: true, $not: {$size: 0} } }
			).updateMany({
				$pull: {programs: program.id}
			});

		}

		return program;
  }

  async delete(id: string): Promise<any>  {
		const program = await this.programRepository.findById(id);

		if(program) {
			
			await this.teacherRepository.find(
				{ programs: { $exists: true, $not: {$size: 0} } }
			).updateMany({
				$pull: {programs: program.id}
			});
		
			const seoId: any = program.seo;
			await this.seoService.delete(seoId);
			await this.programRepository.findOneAndDelete(program.id);

			
			return {
				id: program.id,
				deleted: true
			}

		} else {
			throw new HttpException(MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
		}
  }
}
