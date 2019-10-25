import { Module, HttpModule } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';
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
  providers: [ShowsService],
  controllers: [ShowsController],
})
export class ShowsModule { }
