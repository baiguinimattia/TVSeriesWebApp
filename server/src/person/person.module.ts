import { Module, HttpModule } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
  imports: [
    ConfigModule,
    HttpModule.register({
      maxRedirects: 5,
   }),
    PassportModule.register({ defaultStrategy: 'jwt'}),
  ],
})
export class PersonModule {}
