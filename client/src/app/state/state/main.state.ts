import { MainStateModel } from '../models/main.model';
import { State, Selector, StateContext } from '@ngxs/store';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { Result } from 'src/app/interfaces/popular.interface';

@State<MainStateModel>({
    name: 'main',
    defaults: {
        visits: new Array<string>(),
        ifMenuActive: false,
        popular: { page: 1, total_results: 10000, total_pages: 500, results: new Array<Result>() },
        topRated: { page: 1, total_results: 10000, total_pages: 500, results: new Array<Result>() },
    }
})
export class MainState {
    constructor() {
    }

    @Selector()
    static visits(state: MainStateModel): Array<string> {
        return state.visits;
    }

    @Selector()
    static menuState(state: MainStateModel): boolean {
        return state.ifMenuActive;
    }

    @Selector()
    static popular(state: MainStateModel): Array<Result> {
        return state.popular.results;
    }

    @Selector()
    static topRated(state: MainStateModel): Array<Result> {
        return state.topRated.results;
    }

    @Receiver()
    public static addId({ getState, patchState }: StateContext<MainStateModel>,
        { payload }: EmitterAction<Array<string>>) {
        const currentState = getState();
        currentState.visits = this.removeDuplicates(payload);
        patchState(currentState);
    }

    @Receiver()
    public static setMenuState({ getState, patchState }: StateContext<MainStateModel>,
        { payload }: EmitterAction<boolean>) {
        const currentState = getState();
        currentState.ifMenuActive = payload;
        patchState(currentState);
    }

    private static removeDuplicates(ids: Array<string>) {
        return ids.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
    }

    @Receiver()
    public static setPopular({ getState, patchState }: StateContext<MainStateModel>,
        { payload }: EmitterAction<Array<Result>>) {
        const currentState = getState();
        currentState.popular.results = payload;
        patchState(currentState);
    }

    @Receiver()
    public static setTopRated({ getState, patchState }: StateContext<MainStateModel>,
        { payload }: EmitterAction<Array<Result>>) {
        const currentState = getState();
        currentState.topRated.results = payload;
        patchState(currentState);
    }
}