import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/state/auth.state';
import { AuthStateModel } from '../state/models/auth.model';
import { Emitter, Emittable } from '@ngxs-labs/emitter';

@Injectable()
export class AuthGuardService implements CanActivate {

  @Emitter(AuthState.logout)
  public logout: Emittable;
  
  constructor(private authService: AuthService,
    private store: Store,
    private router: Router) {
  }

  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.logout.emit();
    return false;
  }


}
