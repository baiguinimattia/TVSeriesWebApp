import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterForm } from './interfaces/register.interface';
import { Observable, of, throwError } from 'rxjs';
import { LoginForm } from './interfaces/login.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthStateModel } from '../state/models/auth.model';
import { tap, catchError, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient, private readonly cookieService: CookieService,
    private readonly router: Router, private readonly toastr: ToastrService) { }

  register(formData: RegisterForm): Observable<any> {
    return this.http.post('/api/auth/signUp', formData).pipe(take(1));
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post('/api/auth/signIn', formData).pipe(
      take(1),
    );
  }


  isAuthenticated() {
    const token = this.cookieService.get('authorization');
    const jwtHelper = new JwtHelperService();
    return token && !jwtHelper.isTokenExpired(token);
  }

  sync(): Observable<{ isAuthenticated: boolean }> {
    return this.http.get<{ isAuthenticated: boolean }>('/api/auth/sync');
  }

  logout() {
    this.cookieService.delete('authorization');
    return of();
  }

  getSessionId(): string {
    return this.cookieService.get('authorization');
  }
}
