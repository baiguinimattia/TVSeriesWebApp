import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

import * as imdb from 'imdb-api';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AddShowDto } from './dto/add-show.dto';
import { User } from 'src/auth/user.entity';
import { Show } from './tv.entity';
import { TvRepository } from './tv.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TvService {
    private readonly headers: any;

    constructor(
        private readonly http: HttpService, private readonly configService: ConfigService,
        @InjectRepository(TvRepository)
        private tvRepository: TvRepository,
    ) {
        this.headers = {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host': 'uflixit.p.rapidapi.com', 'x-rapidapi-key': this.configService.getApiKey,
        };
    }

    getSearchResult(searchText: string) {
        return this.http.get(`${this.getBasePath}/search/tv`,
            {
                params: this.configService.generateParams({ key: 'query', value: searchText }),
            }).pipe(
                map(response => response.data.results),
            )
    }

    getDetails(id: string) {
        return this.http.get(`${this.getBasePath}/tv/${id}`, {
            params: this.configService.generateParams(),
        });
    }

    getExternalIds(id: string) {
        return this.http.get(`${this.getBasePath}/tv/${id}/external_ids`,
            {
                params: this.configService.generateParams()
            });
    }

    getCredits(id: string) {
        return this.http.get(`${this.getBasePath}/tv/${id}/credits`,
            {
                params: this.configService.generateParams()
            });
    }

    private get getBasePath(): string {
        return this.configService.tmdbBasePath;
    }

    getAlternativeTitles(id: string) {
        return this.http.get(`${this.getBasePath}/tv/${id}/alternative_titles`,
            {
                params: this.configService.generateParams(),
            }
        );
    }

    getContentRating(id: string) {
        return this.http.get(`${this.getBasePath}/tv/${id}/content_ratings`,
            {
                params: this.configService.generateParams(),
            }
        );
    }

    getKeywords(id: string) {
        return this.http.get(`${this.getBasePath}/tv/${id}/keywords`,
            {
                params: this.configService.generateParams(),
            }
        );
    }

    getRecommendations(id: string) {
        return this.http.get(`${this.getBasePath}/tv/${id}/recommendations`,
            {
                params: this.configService.generateParams(),
            }
        );
    }

    getSimilar(id: string) {
        return this.http.get(`${this.getBasePath}/tv/${id}/similar`,
            {
                params: this.configService.generateParams(),
            }
        );
    }

    getLatest() {
        return this.http.get(`${this.getBasePath}/tv/latest`,
            {
                params: this.configService.generateParams(),
            }
        );
    }

    getPopular() {
        return this.http.get(`${this.getBasePath}/tv/popular`,
            {
                params: this.configService.generateParams(),
            }
        );
    }

    getImdb(id: string) {
        return of(imdb.get({ id: id }, { apiKey: this.configService.imdbApiKey }));
    }

    getEpisodesBySeasonNo(id: string, no: number) {
        return this.http.get(`${this.getBasePath}/tv/${id}/season/${no}`,
            {
                params: this.configService.generateParams(),
            });
    }

    getEpisode(id: string, sno: number, eno: number) {
        return this.http.get(`${this.getBasePath}/tv/${id}/season/${sno}/episode/${eno}`,
            {
                params: this.configService.generateParams(),
            });
    }

    getEpisodesImages(id: string, sno: number, eno: number) {
        return this.http.get(`${this.getBasePath}/tv/${id}/season/${sno}/episode/${eno}/images`,
            {
                params: this.configService.generateParams(),
            });
    }

    getTopRated() {
        return this.http.get(`${this.getBasePath}/tv/top_rated`,
            {
                params: this.configService.generateParams(),
            }
        );
    }

    async addShow(
        addShowDto: AddShowDto,
        user: User
    ): Promise<void> {
        return this.tvRepository.addShow(addShowDto, user);
    }

    async removeShow(
        id: string,
        user: User
    ): Promise<Show[]> {
        return this.tvRepository.removeShow(id);
    }

    getOnAir() {
        return this.http.get(`${this.getBasePath}/tv/on_the_air`,
            {
                params: this. configService.generateParams(),
            });
    }

}
