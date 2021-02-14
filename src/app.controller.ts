import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    // @InjectRepository(UserEntity)
    // private readonly petsRepository: MongoRepository<UserEntity>,
    private readonly appService: AppService,
  ) {}

	  
  @Get('/static/images/teachers/:fileId')
  async teacherAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'static/images/teachers'});
  }

	@Get('/static/images/programs/:fileId')
  async program(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'static/images/programs'});
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
