import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {


  constructor(private readonly authService: AuthService, private router: Router,
    private readonly toastr: ToastrService, private store: Store) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
      req = req.clone({ headers: req.headers.set('Authorization', this.authService.getSessionId()) });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case (401):
            if (this.urlContains('/api/auth/signIn', req)) {
              return throwError(error);
            } else {
              this.toastr.error('The session has expired.');
              this.authService.logout();
            }
            break;
          case (504):
            this.toastr.error('Error while requesting data.');
            break;
          default:
            return throwError(error);
        }
      })
    );
  }

  private urlContains(path: string, req: HttpRequest<any>): boolean {
    return req.url.indexOf(path) !== -1;
  }
}
