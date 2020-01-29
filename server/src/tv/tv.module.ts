import { Module, HttpModule } from '@nestjs/common';
import { TvService } from './tv.service';
import { TvController } from './tv.controller';
import { ConfigModule } from '../config/config.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvRepository } from './tv.repository';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
       maxRedirects: 5,
    }),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    TypeOrmModule.forFeature([TvRepository]),
  ],
  providers: [TvService],
  controllers: [TvController],
})
export class TvModule { }
