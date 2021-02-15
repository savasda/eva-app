import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class PriceDTO {
	@IsNumber()
	@ApiProperty()
	for8: number;

	@IsNumber()
	@ApiProperty()
	for4: number;

	_id?:string;

}