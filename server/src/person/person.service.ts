import { Injectable, HttpService } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PersonService {
    constructor(private readonly http: HttpService, private readonly configService: ConfigService) {

    }

    getPersonDetails(id: string): Observable<any> {
        return this.http.get(`${this.getBasePath}/person/${id}`, { params: this.configService.generateParams()}).pipe(
            map( response => response.data ),
            catchError( (error) => throwError(error)),
        );
    }

    private get getBasePath() {
        return String(this.configService.tmdbBasePath);
    }
}
