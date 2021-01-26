import { IsString } from 'class-validator';

export class ProgramDTO {
	@IsString()
	name: string;
	
	@IsString()
  description: string;
}
