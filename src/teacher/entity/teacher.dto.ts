import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsByteLength, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { SeoDTO } from "src/shared/entity/seo.dto";

export class TeacherDTO {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	name: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	description: string;

	@IsArray()
	@IsOptional()
	@ApiProperty()
	programIds?: Array<string>;

	@IsNotEmpty()
	@ApiProperty()
	seo: SeoDTO

	@IsString()
	@ApiProperty()
	imagePath: string

}