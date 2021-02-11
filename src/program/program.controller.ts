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
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { extname } from 'path';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { ProgramDTO } from './entities/program.dto';
import { ProgramService } from './program.service';
import { diskStorage } from  'multer';

@Controller('api/program')
export class ProgramController {
	constructor(private programService: ProgramService) {}

	@ApiUnauthorizedResponse()
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

	@ApiUnauthorizedResponse()
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

	@ApiOkResponse({ description: 'Upload program image' })
  @ApiUnauthorizedResponse()
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/images/programs', 
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
