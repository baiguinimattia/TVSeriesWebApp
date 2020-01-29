import { Component, OnInit } from '@angular/core';
import { Actions } from '@ngxs/store';
import { Router } from '@angular/router';
import { AuthState } from './state/state/auth.state';
import {
  ofEmittableDispatched, Emitter, Emittable,
} from '@ngxs-labs/emitter';
import { MainState } from './state/state/main.state';
import { Result, Popular } from './interfaces/popular.interface';
import { TvService } from './data-layer/tv.service';
import { take, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  @Emitter(MainState.setPopular)
  public popular: Emittable<Result[]>;

  @Emitter(MainState.setTopRated)
  public topRated: Emittable<Result[]>;

  @Emitter(MainState.updateMyList)
  public myList: Emittable<string[]>;

  constructor(private actions: Actions, private router: Router, private tvSrv: TvService) { }

  ngOnInit() {
    this.actions.pipe(ofEmittableDispatched(AuthState.logout)).subscribe(() => {
      this.router.navigate(['/login']);
    });
    this.tvSrv.getPopular().pipe(
      take(1),
      map((response: Popular) => response.results),
      tap((results: Result[]) => {
        this.popular.emit(results);
      }),
    ).subscribe();

    this.tvSrv.getTopRated().pipe(
      take(1),
      map( (response: Popular) => response.results),
      tap( (results: Result[]) => {
        this.topRated.emit(results);
      })
    ).subscribe();

    this.tvSrv.getMyList().pipe(
      take(1),
      tap( (response: string[]) => {
        this.myList.emit(response);
      } ),
    ).subscribe();
  }

}
