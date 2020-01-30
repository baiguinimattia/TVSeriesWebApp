import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { DetailsPageComponent } from './details-page/details-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { EpisodeDetailsComponent } from './details/episode-details/episode-details.component';
import { PopularComponent } from './popular/popular.component';
import { MyListComponent } from './my-list/my-list.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'search', component: SearchPageComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'popular', component: PopularComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'mylist', component: MyListComponent, canActivate: [AuthGuardService],
  },
  {
    path: ':id', component: DetailsPageComponent, canActivate: [AuthGuardService]
  },
  {
    path: ':id/season/:sno/episode/:eno', component: EpisodeDetailsComponent, canActivate: [AuthGuardService]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
