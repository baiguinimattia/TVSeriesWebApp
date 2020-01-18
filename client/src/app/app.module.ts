import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HomeModule } from './home/home.module';
import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { DetailsPageModule } from './details-page/details-page.module';
import { SearchPageModule } from './search-page/search-page.module';
import { DirectivesModule } from './shared/directives/directives.module';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './state/state/auth.state';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { DetailsState } from './state/state/details.state';

export function jwtOptionsFactory(authService: AuthService) {
  return {
    tokenGetter: () => authService.getSessionId(),
    whitelistedDomains: ['localhost:3000']
  };
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      "closeButton": true,
      "positionClass": "toast-bottom-full-width",
      "timeOut": 3000,
      "extendedTimeOut": 1000,
    }),
    SharedModule,
    AuthModule,
    HttpClientModule,
    HomeModule,
    DetailsPageModule,
    SearchPageModule,
    DirectivesModule,
    NgxsModule.forRoot([AuthState, DetailsState]),
    NgxsEmitPluginModule.forRoot(),
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
