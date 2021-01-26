import {
	Controller,
	Delete,
	Get,
	Post,
	Put,
	Body,
	Param,
	HttpCode,
	UsePipes,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { ProgramDTO } from './entities/program.dto';
import { ProgramService } from './program.service';

@Controller('api/program')
export class ProgramController {
	constructor(private programService: ProgramService) {}

	@Get()
	async showAllPrograms() {
		return await this.programService.getAllPrograms();
	}

	@Post()
	@UseGuards(new AuthGuard())
	@UsePipes(new ValidationPipe())
	createProgram(@Body() data: ProgramDTO) {
		return this.programService.create(data);
	}

	@Get(':id')
	readProgram(@Param('id') id: string) {
		return this.programService.read(id);
	}

	@Put(':id')
	@UseGuards(new AuthGuard())
	@UsePipes(new ValidationPipe())
	updateProgram(@Param('id') id: string, @Body() data: Partial<ProgramDTO>) {
		return this.programService.update(id, data);
	}

	@Delete(':id')
	@UseGuards(new AuthGuard())
	@HttpCode(204)
	deleteProgram(@Param('id') id: string) {
		return this.programService.delete(id);
	}
}
