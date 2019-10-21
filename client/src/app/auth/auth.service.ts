import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from './interfaces/register.interface';
import { Observable } from 'rxjs';
import { LoginForm } from './interfaces/login.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private expirationDayes = 86400000;
  constructor(private readonly http: HttpClient, private readonly cookieService: CookieService) { }

  signUp(formData: RegisterForm): Observable<any> {
    return this.http.post('/api/auth/signUp', formData);
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post('/api/auth/signIn', formData);
  }

  sync(): Observable<any> {
    return this.http.get('/api/auth/sync');
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('Authorization');
    const jwtHelper = new JwtHelperService();
    // const decodedToken = jwtHelper.decodeToken(token);

    return token && !jwtHelper.isTokenExpired(token);
  }

  logout() {
    this.cookieService.delete('Authorization');
  }
}
