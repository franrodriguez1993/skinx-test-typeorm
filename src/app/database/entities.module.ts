import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SkinXEntity } from './entities/skinx.entity';
import { UserEntity } from './entities/user.entity';

const ENTITIES = [
  TypeOrmModule.forFeature([SkinXEntity]),
  TypeOrmModule.forFeature([UserEntity]),
];

@Module({ imports: ENTITIES, exports: ENTITIES })
export class EntitiesModule {}
