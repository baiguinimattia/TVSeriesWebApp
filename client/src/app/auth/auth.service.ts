import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from './interfaces/register.interface';
import { Observable } from 'rxjs';
import { LoginForm } from './interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  signUp(formData: RegisterForm): Observable<any> {
    return this.http.post('/api/auth/signUp', formData);
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post('/api/auth/signIn', formData);
  }
}
