import { Controller, Get, Param, Query, UseGuards, Patch, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { TvService } from './tv.service';
import { AuthGuard } from '@nestjs/passport';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AddShowDto } from './dto/add-show.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tv')
@UseGuards(AuthGuard())
export class TvController {

    constructor(private readonly tvService: TvService) { }

    @Get('popular')
    getPopular() {
        return this.tvService.getPopular().pipe(
            map(response => response.data),
        );
    }

    @Get('search')
    getSearchResult(@Query('query') query) {
        return this.tvService.getSearchResult(query);
    }


    @Get('top_rated')
    getTopRated() {
        return this.tvService.getTopRated().pipe(
            map(response => response.data),
        );
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

    @Get(':id/recommendations')
    getRecommendations(@Param('id') id: string) {
        return this.tvService.getRecommendations(id).pipe(
            map(response => response.data.results),
        );
    }

    @Get(':id/season/:sno/episode/:eno/images')
    getEpisodesImages(@Param() params) {
        return this.tvService.getEpisodesImages(params.id, params.sno, params.eno).pipe(
            map(response => response.data),
        );
    }

    @Get(':id/season/:sno/episode/:eno')
    getEpisode(@Param() params) {
        return this.tvService.getEpisode(params.id, params.sno, params.eno).pipe(
            map(response => response.data),
        );
    }

    @Post('list')
    @UsePipes(ValidationPipe)
    addShow(
        @Body() addShowDto: AddShowDto,
        @GetUser() user: User
    ) {
        return this.tvService.addShow(addShowDto, user);
    }
}
