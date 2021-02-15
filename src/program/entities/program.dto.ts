import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SeoDTO } from 'src/shared/entity/seo.dto';
import { PriceDTO } from './price.dto';
import { ScheduleDTO } from './schedule.dto';

export class ProgramDTO {
	@IsString()
	@ApiProperty()
	name: string;
	
	@IsString()
	@ApiProperty()
	description: string;
	
	@IsArray()
	@IsOptional()
	@ApiProperty()
	teacherIds: Array<string>;

	@IsNotEmpty()
	@ApiProperty()
	seo: SeoDTO
	
	@IsString()
	@IsOptional()
	@ApiProperty()
	imagePath: string

	@ApiProperty()
	price: PriceDTO

	@ApiProperty()
	scheduls: ScheduleDTO[]
}
