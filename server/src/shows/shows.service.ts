import { Injectable, HttpService, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ShowsService {
    private baseUrlPath: string;
    constructor(private readonly http: HttpService, private readonly configService: ConfigService) {
        this.baseUrlPath = this.configService.get('BASE_API_PATH');
    }

    getPopular() {
        try {
            return this.http.get(this.baseUrlPath + '/tv-shows/popular', {
                headers: {
                    'content-type': 'application/octet-stream',
                    'x-rapidapi-host': 'uflixit.p.rapidapi.com', 'x-rapidapi-key': this.configService.getApiKey,
                },
            });
        } catch (err) {
            throw new BadRequestException();
        }
    }
}
