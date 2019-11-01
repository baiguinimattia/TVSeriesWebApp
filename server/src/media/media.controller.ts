import { Controller, UseGuards, Get, Param, Body, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MediaService } from './media.service';
import { json } from 'body-parser';

@Controller('media')
@UseGuards(AuthGuard())
export class MediaController {

    constructor(private readonly mediaService: MediaService) {}

    @Get('logo')
    getLogoPath(@Param() params): string {
        return this.mediaService.getLogoPath(params.path, params.dimension);
    }

    @Get('poster')
    getPosterPath(@Query() query): string {
        return JSON.stringify(this.mediaService.getPosterPath(query.path, query.dimension));
    }
}
