import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {


  constructor(private readonly authService: AuthService, private router: Router,
    private readonly toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getSessionId();
      req = req.clone({
        headers: req.headers.set('Authorization', token),
      });
    }

    return next.handle(req).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.toastr.error('You need to authenticate!');
          this.router.navigate(['login']);
        }
      }));
  }
}
