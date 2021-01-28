import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { TeacherDTO } from './entity/teacher.dto';
import { TeacherService } from './teacher.service';

@Controller('api/teacher')
export class TeacherController {

	constructor(private teacherService: TeacherService){}

	@Get()
	getAll() {
		return this.teacherService.getAll();
	}

	@Get(':id')
	getOne(@Param() data: {id: string}) {
		return this.teacherService.getOne(data.id)
	}

	@Post() 
	@UsePipes(new ValidationPipe())
	@UseGuards(new AuthGuard())
	create(@Body() data: TeacherDTO) {
		return this.teacherService.create(data);
	}

	@Put('bound/:id')
	@UseGuards(new AuthGuard())
	boundTeacherWithProgram(@Body() data: {programIds: string[]}, @Param() param: {id: string}) {
		const { programIds } = data;
		const { id } = param;
		return this.teacherService.pushProgram(programIds, id);
	}

}
