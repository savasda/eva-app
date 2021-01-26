import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserDTO } from './entity/user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {

	constructor(private userService: UserService) {

	}

	@Post('login')
	@UsePipes(new ValidationPipe())
	login(@Body() data: UserDTO) {
		return this.userService.login(data);
	}

	@Post('register')
	@UsePipes(new ValidationPipe())
	register(@Body() data: UserDTO) {
		return this.userService.register(data);
	}
	
}
