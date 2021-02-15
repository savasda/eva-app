import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SeoDTO {
	@IsString()
	@IsNotEmpty()
	@MaxLength(70)
	@ApiProperty()
	title: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(160)
	@ApiProperty()
	description: string;
	
	@IsArray()
	@ApiProperty()
	keywords: Array<string>
}