import { IsArray, IsOptional, IsString } from 'class-validator';

export class ProgramDTO {
	@IsString()
	name: string;
	
	@IsString()
	description: string;
	
	@IsArray()
	@IsOptional()
	teacherIds?: Array<string>;
}
