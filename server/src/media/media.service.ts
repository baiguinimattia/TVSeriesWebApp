import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class MediaService {
    private baseUrlPath: string;
    private tmbdApiKey: string;
    constructor(private readonly configService: ConfigService,
        private readonly http: HttpService) {
        this.baseUrlPath = this.configService.imageBasePath;
        this.tmbdApiKey = this.configService.tmbdApiKey;
    }

    getLogoPath(path: string, dimension?: string): string {
        return this.baseUrlPath + dimension ? dimension : '' + '?api_key=' + this.tmbdApiKey;
    }

    getPosterPath(path: string, dimension?: string) {
        const fullPath = this.baseUrlPath +  dimension + path;
        return this.http.get(fullPath, {
            responseType: 'blob',
        });
    }
}
