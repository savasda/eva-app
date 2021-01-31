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

	@Put(':id')
	@UseGuards(new AuthGuard())
	@UsePipes(new ValidationPipe())
	updateProgram(@Param('id') id: string, @Body() data: Partial<TeacherDTO>) {
		return this.teacherService.update(id, data);
	}

}
