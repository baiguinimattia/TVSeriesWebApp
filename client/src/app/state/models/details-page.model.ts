import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { Person } from 'src/app/interfaces/person.interface';
import { ContentRating } from 'src/app/interfaces/content-rating.interface';
import { ExternalIds } from 'src/app/interfaces/external-ids.interface';
import { ImdbDetails } from 'src/app/interfaces/imdb-details.interface';

export interface DetailsStateModel {
    id: string;
    details: ShowDetails;
    cast: Person[];
    crew: Person[];
    posterPath: string;
    contentRating: ContentRating[];
    externalIds: ExternalIds;
    imdbDetails: ImdbDetails;
}