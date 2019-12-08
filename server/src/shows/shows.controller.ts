import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { AxiosResponse } from 'axios';
import { AuthGuard } from '@nestjs/passport';

@Controller('tv')
@UseGuards(AuthGuard())
export class ShowsController {

    constructor(private readonly showsService: ShowsService) { }

    @Get('popular')
    getPopular(): Promise<AxiosResponse<{ error: boolean, result: string[] }>> {
        return this.showsService.getPopular().toPromise()
            .then(response => response.data)
            .catch(error => error);
    }

    @Get('/search')
    getSearchResult(@Query('query') query) {
        return this.showsService.getSearchResult(query).toPromise()
            .then(response => response.data.results)
            .catch(error => error);
    }

    @Get(':id')
    getDetails(@Param('id') id: string) {
        return this.showsService.getDetails(id).toPromise()
            .then(response => response.data)
            .catch(error => error);
    }

    @Get(':id/external_ids')
    getExternalIds(@Param('id') id: string) {
        return this.showsService.getExternalIds(id).toPromise()
            .then(response => response.data)
            .catch(error => error);
    }

}
