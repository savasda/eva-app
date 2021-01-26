import { IsNotEmpty, IsString } from "class-validator";

export class TeacherDTO {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	description: string;
}