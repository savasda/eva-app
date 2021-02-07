import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { seoSchema } from 'src/shared/entity/seo.entity';
import { REPOSITORY } from 'src/shared/repository';
import { SeoService } from './seo.service';

@Module({
  providers: [SeoService],
	exports: [SeoService],
	imports:[
		MongooseModule.forFeatureAsync([
			{
				name: REPOSITORY.SEO,
				useFactory: () => {
					return seoSchema;
				}
			}
		])
	]
})
export class SeoModule {}
