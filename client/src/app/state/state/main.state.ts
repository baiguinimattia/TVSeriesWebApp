import { MainStateModel } from '../models/main.model';
import { State, Selector, StateContext } from '@ngxs/store';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';

@State<MainStateModel>({
    name: 'main',
    defaults:{
        visits: new Array<string>(),
        ifMenuActive: false,
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
        return ids.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
    }
}