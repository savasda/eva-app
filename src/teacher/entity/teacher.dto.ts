import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { SeoDTO } from "src/shared/entity/seo.dto";

export class TeacherDTO {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsArray()
	@IsOptional()
	programIds?: Array<string>;

	@IsNotEmpty()
	seo: SeoDTO
}