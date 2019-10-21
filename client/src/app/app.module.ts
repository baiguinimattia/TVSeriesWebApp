import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right'
    }),
    SharedModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
