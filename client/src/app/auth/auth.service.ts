import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from './interfaces/register.interface';
import { Observable, of } from 'rxjs';
import { LoginForm } from './interfaces/login.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthStateModel } from '../state/models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient, private readonly cookieService: CookieService,
    private readonly router: Router) { }

  register(formData: RegisterForm): Observable<any> {
    return this.http.post('/api/auth/signUp', formData);
  }

  login(formData: AuthStateModel): Observable<any> {
    return this.http.post('/api/auth/signIn', formData);
  }


  isAuthenticated() {
    const token = this.cookieService.get('authorization');
    const jwtHelper = new JwtHelperService();
    return token && !jwtHelper.isTokenExpired(token);
  }

  sync(): Observable<{isAuthenticated: boolean}> {
    return this.http.get<{isAuthenticated: boolean}>('/api/auth/sync');
  }

  logout() {
    this.cookieService.delete('authorization');
    return of();
  }

  getSessionId(): string {
    return this.cookieService.get('authorization');
  }
}
