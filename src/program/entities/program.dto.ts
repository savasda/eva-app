import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SeoDTO } from 'src/shared/entity/seo.dto';

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
}
