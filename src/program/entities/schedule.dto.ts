import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ScheduleDTO {
	@ApiProperty()
	@IsNumber()
	@IsOptional()
	day: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	start: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	end: string;

	_id?: string;
}