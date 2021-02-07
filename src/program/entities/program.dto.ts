import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SeoDTO } from 'src/shared/entity/seo.dto';

export class ProgramDTO {
	@IsString()
	name: string;
	
	@IsString()
	description: string;
	
	@IsArray()
	@IsOptional()
	teacherIds?: Array<string>;

	@IsNotEmpty()
	seo: SeoDTO
}
