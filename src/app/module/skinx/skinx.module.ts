import { Module } from '@nestjs/common';
import { SkinxService } from './skinx.service';
import { SkinxController } from './skinx.controller';
import { ConfigModule } from '@nestjs/config';
import { EntitiesModule } from 'src/app/database/entities.module';

@Module({
  imports: [ConfigModule.forRoot(), EntitiesModule],
  controllers: [SkinxController],
  providers: [SkinxService],
})
export class SkinxModule {}
