import { Module, HttpModule } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { ConfigModule } from '../config/config.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [MediaController],
  imports: [
    ConfigModule,
    HttpModule.register({
      maxRedirects: 5,
   }),
    PassportModule.register({ defaultStrategy: 'jwt'}),
  ],
  providers: [MediaService],
})
export class MediaModule {}
