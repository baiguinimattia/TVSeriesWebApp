import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TvService {
    private readonly headers: any;

    constructor(private readonly http: HttpService, private readonly configService: ConfigService) {
        this.headers = {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host': 'uflixit.p.rapidapi.com', 'x-rapidapi-key': this.configService.getApiKey,
        };
    }

    getPopular() {
        try {
            return this.http.get(`${this.getBasePath}/tv-shows/popular`, {
                headers: this.headers,
            });
        } catch (err) {
            throw new BadRequestException();
        }
    }

    getSearchResult(searchText: string) {
        return this.http.get(`${this.getBasePath}/search/tv`,
            {
                params: this.configService.generateParams({ key: 'query', value: searchText }),
            });
    }

    getDetails(id: string) {
        return this.http.get(`${this.getBasePath}/tv/${id}`, {
            params: this.configService.generateParams(),
        });
    }

    getExternalIds(id: string) {
        return this.http.get(`${this.getBasePath}/tv/${id}/external_ids`, { params: this.configService.generateParams() });
    }

    getCredits(id: string) {
        return this.http.get(`${this.getBasePath}/tv/${id}/credits`, { params: this.configService.generateParams()});
    }

    private get getBasePath(): string {
        return this.configService.tmdbBasePath;
    }
}
