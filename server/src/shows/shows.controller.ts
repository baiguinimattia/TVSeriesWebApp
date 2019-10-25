import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { AxiosResponse } from 'axios';
import { AuthGuard } from '@nestjs/passport';

@Controller('shows')
@UseGuards(AuthGuard())
export class ShowsController {

    constructor(private readonly showsService: ShowsService) { }

    @Get('popular')
    getPopular(): Promise<AxiosResponse<{ error: boolean, result: string[] }>> {
        return this.showsService.getPopular().toPromise()
            .then(response => response.data)
            .catch(error => error);
    }

    @Get(':id')
    getShow(@Param('id') id) {
        return this.showsService.getShow(id);
    }

    @Get(':id/episodes')
    getEpisodes(@Param('id') id) {
        return this.showsService.getEpisodes(id);
    }

    @Get('')
    getFromSearch(@Query('title') title: string) {
        return this.showsService.getFromSearch(title);
    }

}
