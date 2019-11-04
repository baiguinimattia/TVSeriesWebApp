import { Controller, UseGuards, Get, Param, Body, Query, HttpService } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MediaService } from './media.service';

@Controller('media')
@UseGuards(AuthGuard())
export class MediaController {

    constructor(private readonly mediaService: MediaService, private readonly http: HttpService) { }

    @Get('logo')
    getLogoPath(@Param() params): string {
        return this.mediaService.getLogoPath(params.path, params.dimension);
    }

    @Get('poster')
    getPosterPath(@Query() query) {
        // return JSON.stringify(this.mediaService.getPosterPath(query.path, query.dimension));
        return this.mediaService.getPosterPath(query.path, query.dimension).toPromise()
        .then(response => response.data)
        .catch(error => error);
    }
}
