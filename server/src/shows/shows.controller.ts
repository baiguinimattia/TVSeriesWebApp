import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ShowsService } from './shows.service';
import * as fastJson from 'fast-json-stringify';

@Controller('shows')
export class ShowsController {

    constructor(private readonly showsService: ShowsService) { }

    @Get('popular')
    getPopular() {
        return this.showsService.getPopular();
    }
}
