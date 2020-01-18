import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/state/auth.state';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
    private store: Store) {
  }

  canActivate() {
    return this.store.selectSnapshot(AuthState.isAuthenticated);
  }


}
