import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class MediaService {
    private baseUrlPath: string;
    private tmbdApiKey: string;
    constructor(private readonly configService: ConfigService) {
        this.baseUrlPath = this.configService.imageBasePath;
        this.tmbdApiKey = this.configService.tmbdApiKey;
    }

    getLogoPath(path: string, dimension?: string): string {
        return this.baseUrlPath + dimension ? dimension : '' + '?api_key=' + this.tmbdApiKey;
    }

    getPosterPath(path: string, dimension?: string): string {
        return this.baseUrlPath + dimension  + path + '?api_key=' + this.tmbdApiKey;
    }
}
