import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { REPOSITORY } from 'src/shared/repository';

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: REPOSITORY.USER,
				useFactory: () => {
					const schema = UserSchema;
          schema.pre('save',  async function () { 
						if(!this.hash) {
							this.hash = await bcrypt.hash(this.password, 10);
							this.password = null
						}
					});
					return schema;
        },
			}
		])
	],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
