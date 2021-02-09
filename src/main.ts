import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './user/user.module';

const port = process.env.PORT || 8080;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	const config = new DocumentBuilder()
	.setTitle('Api default')
	.setDescription('Working api')
	.setVersion('1.0')
	.build();

	const userConfig = new DocumentBuilder()
	.setTitle('User example')
	.setDescription('Working with user model')
	.setVersion('1.0')
	.addTag('user')
	.build();

	const document = SwaggerModule.createDocument(app, config);
	const userDocument = SwaggerModule.createDocument(app, config, {
    include: [UserModule],
	});
	
	SwaggerModule.setup('api', app, document);
	SwaggerModule.setup('api/user', app, userDocument);
	
  await app.listen(port);
  Logger.log(`Server running on http/localhost:${port}`, 'Bootstrap');
}
bootstrap();
