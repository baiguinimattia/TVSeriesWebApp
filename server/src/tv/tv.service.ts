import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

import * as imdb from 'imdb-api';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TvService {
    private readonly headers: any;

    constructor(private readonly http: HttpService, private readonly configService: ConfigService) {
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



}
