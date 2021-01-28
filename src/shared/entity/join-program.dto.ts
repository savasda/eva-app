import { IsNotEmpty, IsString } from "class-validator";

export class JoinProgramDTO {

	@IsNotEmpty()
	@IsString()
	programId: string; 


	@IsNotEmpty()
	@IsString()
	teacherId: string
}