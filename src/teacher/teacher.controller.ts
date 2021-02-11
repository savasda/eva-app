import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { extname } from 'path';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { TeacherDTO } from './entity/teacher.dto';
import { TeacherService } from './teacher.service';
import { diskStorage } from  'multer';

@Controller('api/teacher')
export class TeacherController {

	constructor(private teacherService: TeacherService){}

	@ApiOkResponse({ description: 'Get all teachers' })
  @ApiUnauthorizedResponse()
	@Get()
	getAll() {
		return this.teacherService.getAll();
	}

	@ApiOkResponse({ description: 'Get one teacher' })
  @ApiUnauthorizedResponse()
	@Get(':id')
	getOne(@Param() data: {id: string}) {
		return this.teacherService.getOne(data.id)
	}

	@ApiBearerAuth()
  @ApiOkResponse({ description: 'Create teacher' })
  @ApiUnauthorizedResponse()
	@Post() 
	@UsePipes(new ValidationPipe())
	@UseGuards(new AuthGuard())
	create(@Body() data: TeacherDTO) {
		return this.teacherService.create(data);
	}

	@ApiBearerAuth()
  @ApiOkResponse({ description: 'Update teacher' })
  @ApiUnauthorizedResponse()
	@Put(':id')
	@UseGuards(new AuthGuard())
	@UsePipes(new ValidationPipe())
	updateProgram(@Param('id') id: string, @Body() data: Partial<TeacherDTO>) {
		return this.teacherService.update(id, data);
	}

	@ApiBearerAuth()
  @ApiOkResponse({ description: 'Delete teacher' })
  @ApiUnauthorizedResponse()
	@Delete(':id')
	@UseGuards(new AuthGuard())
	deleteProgram(@Param('id') id: string) {
		this.teacherService.delete(id)
	}

	@ApiBearerAuth()
  @ApiOkResponse({ description: 'Upload teacher image' })
  @ApiUnauthorizedResponse()
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/images/teachers', 
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }),
  )
  async uloadavatar(@UploadedFile() file) {
		return file;
  }
}
