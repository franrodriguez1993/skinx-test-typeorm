import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { EntitiesModule } from 'src/app/database/entities.module';

@Module({
  imports: [ConfigModule.forRoot(), EntitiesModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
