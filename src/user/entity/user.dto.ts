import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserDTO {
	@IsNotEmpty()
	@ApiProperty()
	username: string;

	@IsNotEmpty()
	@ApiProperty()
	password: string;
}