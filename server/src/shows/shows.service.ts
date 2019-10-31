import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as imdb from 'imdb-api';

@Injectable()
export class ShowsService {
    private baseUrlPath: string;
    private readonly headers: any;
    private imdbClient: imdb.Client;

    constructor(private readonly http: HttpService, private readonly configService: ConfigService) {
        this.baseUrlPath = this.configService.get('BASE_API_PATH');
        this.headers = {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host': 'uflixit.p.rapidapi.com', 'x-rapidapi-key': this.configService.getApiKey,
        };

        this.imdbClient = new imdb.Client({
            apiKey: this.configService.imdbApiKey,
        });
    }

    getPopular() {
        try {
            return this.http.get(this.baseUrlPath + '/tv-shows/popular', {
                headers: this.headers,
            });
        } catch (err) {
            throw new BadRequestException();
        }
    }

    async getShow(showId: string) {
        try {
            const response = await this.imdbClient.get({ id: showId });
            return response;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    async getEpisodes(showId: string) {
        try {
            const response = await this.imdbClient.get({ id: showId });
            return response.episodes();
        } catch (error) {
            return error;
        }
    }

    async getFromSearch(searchText: string) {
        try {
            const response = await this.imdbClient.search({ name: searchText });
            return response.results;
        } catch (error) {
            return error;
        }
    }

    getSearchTv(searchText: string) {
        return this.http.get(this.configService.tmdbBasePath + '/search/tv',
            {
                params: {
                    query: searchText,
                    api_key: this.configService.tmbdApiKey,
                },
            });
    }
}
