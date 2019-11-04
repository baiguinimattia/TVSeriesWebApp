import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as imdb from 'imdb-api';
import { Any } from 'typeorm';

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

    getSearchResult(searchText: string) {
        return this.http.get(this.configService.tmdbBasePath + '/search/tv',
            {
                params: this.generateParams({key: 'query', value: searchText}),
            });
    }

    private generateParams(...paramList: Array<{ key: string, value: string }>) {
        const param = {};
        paramList.forEach((currentElement) => {
            param[currentElement.key] = currentElement.value;
        });
        param['api_key'] = this.configService.tmbdApiKey;
        return param;
    }

    getDetails(id: string) {
        return this.http.get(this.configService.tmdbBasePath + '/tv/' + id, {
            params: this.generateParams(),
        });
    }
}
