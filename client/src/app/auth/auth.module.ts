import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    LoginModule,
    RegisterModule,
  ],
  exports: [
    LoginModule,
    RegisterModule,
  ],
  providers: [ AuthGuardService, AuthService ]
})
export class AuthModule { }
