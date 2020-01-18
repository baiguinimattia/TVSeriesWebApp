import { AuthStateModel } from '../models/auth.model'
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/auth.service';
import { Login, Logout, Register } from '../actions/auth.action';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        email: null
    }
})
export class AuthState {
    @Selector()
    static token(state: AuthStateModel): string | null {
        return state.token;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        const jwtHelper = new JwtHelperService();
        return state.token && !jwtHelper.isTokenExpired(state.token);
    }

    constructor(private authService: AuthService, private cookieSrv: CookieService) {

    }

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
        return this.authService.login(action.payload).pipe(
            tap((result) => {
                ctx.patchState({
                    token: result.token,
                    email: action.payload.email
                });
            })
        );
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        this.cookieSrv.delete('authorization');
        ctx.setState({
            token: null,
            email: null
        });
    }

    @Action(Register)
    register(ctx: StateContext<AuthStateModel>, action: Register) {
        return this.authService.register(action.payload);
    }
}