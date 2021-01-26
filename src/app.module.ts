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

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      database: process.env.MONGODB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    ProgramModule,
    UserModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [
		AppService,
		{provide: APP_FILTER , useClass: HttpErrorFilter},
		{provide: APP_INTERCEPTOR, useClass: LoggingIntercepr},
	],
})
export class AppModule {}
