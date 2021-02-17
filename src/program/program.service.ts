import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProgramDTO } from './entities/program.dto';
import { ProgramEntity } from './entities/program.entity';
import { MESSAGE } from '../shared/messages';
import { InjectModel } from '@nestjs/mongoose';
import { REPOSITORY } from 'src/shared/repository';
import { Model } from 'mongoose';
import { TeacherEntity } from 'src/teacher/entity/teacher.entity';
import { SeoService } from 'src/seo/seo.service';
import { ScheduleEntity } from './entities/schedule.entity';
import { PriceEntity } from './entities/price.entity';
const slug = require('slug')

@Injectable()
export class ProgramService {
	constructor(
		private seoService: SeoService,
		@InjectModel(REPOSITORY.PROGRAM) private programRepository: Model<ProgramEntity>,
		@InjectModel(REPOSITORY.TEACHER) private teacherRepository: Model<TeacherEntity>,
		@InjectModel(REPOSITORY.PRICE) private priceRepository: Model<PriceEntity>,
		@InjectModel(REPOSITORY.SCHEDULE) private scheduleRepository: Model<ScheduleEntity>
	) {}


  async getAllPrograms(): Promise<Array<ProgramEntity>> {
		return await this.programRepository.find({}).sort({updated: -1})
			.populate({
				path: 'teachers',
				select: { 'programs': 0},
			})
			.populate('seo')
			.populate('price')
			.exec();

  }

  async create(data: ProgramDTO) : Promise<ProgramEntity>{
		const { seo, price, scheduls, description, name, imagePath} = data;
		const program = await this.programRepository.create({
			name, description, imagePath
		});
		const seoEntity = await this.seoService.create(seo);
		
		if(price) {
			const priceEntity = await this.priceRepository.create(price);
			await program.updateOne({
				$set: {
					price: priceEntity._id,
				}
			}).exec()
		}

		if(scheduls) {
			const scheduleEntity = await this.scheduleRepository.insertMany(scheduls);
			await program.updateOne({
				$set: {
					scheduls: scheduleEntity.map(el => el._id)
				}
			}).exec()
		}

		await program.updateOne({
			$set: {
				seo: seoEntity._id,
				alias: slug(program.name, {lower: true})
			}
		}).exec()
	

    return program;
	
  }

  async read(id: string): Promise<ProgramEntity> {
		const program = await this.programRepository.findById(id)
		.populate(
			{
				path: 'teachers',
				select: { 'programs': 0},
			}
		)
		.populate('price')
		.populate('scheduls')
		.populate('seo')
		.exec();

		if(!program) {
			throw new HttpException(MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return program;
  }

  async update(id: string, data: Partial<ProgramDTO>): Promise<ProgramEntity> {
		const { name, description, teacherIds, imagePath, price, seo, scheduls } = data;
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


		if(scheduls?.length) {

			scheduls.forEach(async entity => {
				if(entity._id) {
					await this.scheduleRepository.findByIdAndUpdate({
						_id: entity._id
					}, entity)
				} else {
					const newSchedule = await this.scheduleRepository.create(entity);
					await program.updateOne({
						$push: {
							scheduls: newSchedule._id
						}
					}).exec();
				}
			});

			await program.updateOne({
				$set: {
					scheduls: [
						...scheduls.filter(el => !!el._id && el._id !== null).map(el => el._id), 
					]
				}
			}).exec();

		}

		if(price) {
			await this.priceRepository.findByIdAndUpdate({
				_id: program.price
			}, price);
		}

		if(seo) {
			const id: any = program.seo;
			await this.seoService.update(id, seo);
		}


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

			await this.priceRepository.findByIdAndDelete({
				_id: program.price
			})

			await this.scheduleRepository.findOneAndDelete({
				_id: {
					$in: program.scheduls
				}
			})

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
