import { Popular } from 'src/app/interfaces/popular.interface';

export interface MainStateModel {
    visits: Array<string>;
    ifMenuActive: boolean;
    popular: Popular;
    topRated: Popular;
}