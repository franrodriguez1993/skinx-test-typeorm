import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkinxModule } from './app/module/skinx/skinx.module';
import { UserModule } from './app/module/user/user.module';
import { MySQLClientModule } from './app/database/MySQLClient.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MySQLClientModule,
    SkinxModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
