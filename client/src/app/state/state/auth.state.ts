import { AuthStateModel } from '../models/auth.model'
import { State, Selector, StateContext } from '@ngxs/store';
import { AuthService } from 'src/app/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { Injector } from '@angular/core';

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        email: null
    }
})
export class AuthState {

    private static authSrv: AuthService;
    private static cookieSrv: CookieService;
    constructor(injector: Injector) {
        AuthState.authSrv = injector.get<AuthService>(AuthService);
        AuthState.cookieSrv = injector.get<CookieService>(CookieService);
    }

    @Selector()
    static token(state: AuthStateModel): string | null {
        return state.token;
    }

    @Selector()
    public static isAuthenticated(state: AuthStateModel): boolean {
        return this.authSrv.isAuthenticated();
    }

    @Receiver()
    public static login({ patchState }: StateContext<AuthStateModel>, { payload }: EmitterAction<AuthStateModel>) {
        this.cookieSrv.set('authorization', payload.token);
        patchState(payload);
    }

    @Receiver()
    public static logout({ setState }: StateContext<AuthStateModel>) {
        this.cookieSrv.delete('authorization');
        setState({
            token: null,
            email: null,
        })
    }

}