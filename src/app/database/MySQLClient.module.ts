import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SkinXEntity } from './entities/skinx.entity';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DDBB,
      entities: [SkinXEntity, UserEntity],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
  exports: [],
})
export class MySQLClientModule {}
