import { Module, HttpModule } from '@nestjs/common';
import { TvService } from './tv.service';
import { TvController } from './tv.controller';
import { ConfigModule } from '../config/config.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
       maxRedirects: 5,
    }),
    PassportModule.register({ defaultStrategy: 'jwt'}),
  ],
  providers: [TvService],
  controllers: [TvController],
})
export class TvModule { }
