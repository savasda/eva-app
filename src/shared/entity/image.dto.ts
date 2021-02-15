import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class ImageDTO {
	@IsNotEmpty()
	@IsString()
	destination: string;

	@IsNotEmpty()
	@IsString()
	encoding: string;

	@IsNotEmpty()
	@IsString()
	fieldname: string;

	@IsNotEmpty()
	@IsString()
	filename: string;

	@IsNotEmpty()
	@IsString()
	mimetype: string;

	@IsNotEmpty()
	@IsString()
	originalname: string;

	@IsNotEmpty()
	@IsString()
	path: string;

	@IsNotEmpty()
	@IsNumber()
	size: number;
}