import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from './config/config.module';
import { ShowsModule } from './shows/shows.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist', 'client'),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ConfigModule,
    ShowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
