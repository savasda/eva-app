import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
}