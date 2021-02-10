import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeoDTO } from 'src/shared/entity/seo.dto';
import { SeoEntity } from 'src/shared/entity/seo.entity';
import { REPOSITORY } from 'src/shared/repository';

@Injectable()
export class SeoService {
	constructor(
		@InjectModel(REPOSITORY.SEO) private seoRepository: Model<SeoEntity>,
	) {}

	async update(id: string, data: SeoDTO): Promise<SeoEntity> {
		const {title, keywords, description} = data;
		return await this.seoRepository.findByIdAndUpdate({
			_id: id
		}, {
			title,
			description,
			$set: {keywords: keywords}
		}, 
		{ new: true, useFindAndModify: false });
	}

	async create(data: SeoDTO): Promise<SeoEntity> {
		const seo = await this.seoRepository.create(data);
		return seo;
	}

	async delete(id: string) {
		const seo = await this.seoRepository.findById(id);
		if(!seo) {
			throw new HttpException(`seo item with id ${id} doesn't exist`, HttpStatus.NOT_FOUND)
		}

		await  this.seoRepository.deleteOne(seo);
	}

}
