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
import { ImageFallBackDirective } from './directives/image-fall-back.directive';
import { DirectivesModule } from './directives/directives.module';


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
      timeOut: 5000,
      positionClass: 'toast-top-right'
    }),
    SharedModule,
    AuthModule,
    HttpClientModule,
    HomeModule,
    DetailsPageModule,
    SearchPageModule,
    DirectivesModule
  ],
    providers: [
      CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
