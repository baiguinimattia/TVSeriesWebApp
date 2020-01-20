import { State, Selector, StateContext } from "@ngxs/store";
import { DetailsStateModel } from '../models/details-page.model';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { Person } from 'src/app/interfaces/person.interface';
import { ContentRating } from 'src/app/interfaces/content-rating.interface';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { ExternalIds } from 'src/app/interfaces/external-ids.interface';
import { ImdbDetails } from 'src/app/interfaces/imdb-details.interface';


@State<DetailsStateModel>({
    name: 'details',
})
export class DetailsState {

    constructor() { }

    @Selector()
    public static getId(state: DetailsStateModel): string | null {
        return state.id;
    }

    @Selector()
    public static getDetails(state: DetailsStateModel): ShowDetails {
        return state.details;
    }

    @Selector()
    public static getCast(state: DetailsStateModel): Person[] | [] {
        return state.cast;
    }

    @Selector()
    public static getCrew(state: DetailsStateModel): Person[] | [] {
        return state.crew;
    }

    @Selector()
    public static getPosterPath(state: DetailsStateModel): string {
        return state.posterPath;
    }

    @Selector()
    public static getContentRating(state: DetailsStateModel): ContentRating[] | [] {
        return state.contentRating;
    }

    @Selector()
    public static getExternalIds(state: DetailsStateModel): ExternalIds {
        return state.externalIds;
    }

    @Selector()
    public static getImdbDetails(state: DetailsStateModel): ImdbDetails {
        return state.imdbDetails;
    }

    @Receiver()
    public static setId({ getState, patchState }: StateContext<DetailsStateModel>,
        { payload }: EmitterAction<string>) {
        const currentState = getState();
        currentState.id = payload;
        patchState(currentState);
    }

    @Receiver()
    public static setDetails({ getState, patchState }: StateContext<DetailsStateModel>,
        { payload }: EmitterAction<ShowDetails>) {
        const currentState = getState();
        currentState.details = payload;
        patchState(currentState);
    }

    @Receiver()
    public static setPosterPath({ getState, patchState }: StateContext<DetailsStateModel>,
        { payload }: EmitterAction<string>) {
        const currentState = getState();
        currentState.posterPath = payload;
        patchState(currentState);
    }

    @Receiver()
    public static setCast({ getState, patchState }: StateContext<DetailsStateModel>,
        { payload }: EmitterAction<Person[]>) {
        const currentState = getState();
        currentState.cast = payload;
        patchState(currentState);
    }

    @Receiver()
    public static setCrew({ getState, patchState }: StateContext<DetailsStateModel>,
        { payload }: EmitterAction<Person[]>) {
        const currentState = getState();
        currentState.crew = payload;
        patchState(currentState);
    }

    @Receiver()
    public static setExternalIds({ getState, patchState }: StateContext<DetailsStateModel>,
        { payload }: EmitterAction<ExternalIds>) {
        const currentState = getState();
        currentState.externalIds = payload;
        patchState(currentState);
    }

    @Receiver()
    public static setImdbDetails({ getState, patchState }: StateContext<DetailsStateModel>,
        { payload }: EmitterAction<ImdbDetails>) {
        const currentState = getState();
        currentState.imdbDetails = payload;
        patchState(currentState);
    }

}