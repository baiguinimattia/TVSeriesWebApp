import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { TvService } from './tv.service';
import { AxiosResponse } from 'axios';
import { AuthGuard } from '@nestjs/passport';

import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Controller('tv')
@UseGuards(AuthGuard())
export class TvController {

    constructor(private readonly tvService: TvService) { }

    @Get('popular')
    getPopular(): Promise<AxiosResponse<{ error: boolean, result: string[] }>> {
        return this.tvService.getPopular().toPromise()
            .then(response => response.data)
            .catch(error => error);
    }

    @Get('/search')
    getSearchResult(@Query('query') query) {
        return this.tvService.getSearchResult(query);
    }

    @Get(':id')
    getDetails(@Param('id') id: string) {
        return this.tvService.getDetails(id).toPromise()
            .then(response => response.data)
            .catch(error => error);
    }

    @Get(':id/external_ids')
    getExternalIds(@Param('id') id: string) {
        return this.tvService.getExternalIds(id).toPromise()
            .then(response => response.data)
            .catch(error => error);
    }

    @Get(':id/credits')
    getCredits(@Param('id') id: string): Observable<any> {
        return this.tvService.getCredits(id).pipe(
            map(response => response.data),
        );
    }

    @Get(':id/content_rating')
    getContentRating(@Param('id') id: string): Observable<any> {
        return this.tvService.getContentRating(id).pipe(
            map((response) => response.data),
        );
    }

    @Get(':id/imdb')
    getImdb(@Param('id') id: string) {
        return this.tvService.getImdb(id).pipe(
        );
    }

    @Get(':id/season/:no')
    getEpisodes(@Param('id') id: string, @Param('no') no: number) {
        return this.tvService.getEpisodesBySeasonNo(id, no).pipe(
            map(response => response.data),
        )
    }

}
