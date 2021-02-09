import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SeoDTO {
	@IsString()
	@IsNotEmpty()
	@MaxLength(70)
	title: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(160)
	description: string;
	
	@IsArray()
	keywords: Array<string>
}