import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule,
    RegisterModule
  ],
  exports: [
    LoginModule,
    RegisterModule
  ]
})
export class AuthModule { }
