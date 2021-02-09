import { ExceptionFilter, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProgramModule } from './program/program.module';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { AppService } from './app.service';
import { LoggingIntercepr } from './shared/logger.interceptor';
import { TeacherModule } from './teacher/teacher.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoModule } from './seo/seo.module';

@Module({
  imports: [
		ConfigModule,
		MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
			useCreateIndex: true,
			dbName: process.env.MONGODB_DATABASE
		}),
    ProgramModule,
    UserModule,
    TeacherModule,
    SeoModule,
  ],
  controllers: [AppController],
  providers: [
		AppService,
		{provide: APP_FILTER , useClass: HttpErrorFilter},
		{provide: APP_INTERCEPTOR, useClass: LoggingIntercepr},
	],
})
export class AppModule {}
