import { Component, OnInit } from '@angular/core';
import { DataLayerService } from '../data-layer/data-layer.service';
import { TvService } from '../data-layer/tv.service';
import { take, map, tap } from 'rxjs/operators';
import { Popular, Result } from '../interfaces/popular.interface';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { MainState } from '../state/state/main.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Emitter(MainState.setPopular)
  public popular: Emittable<Result[]>;

  @Emitter(MainState.setTopRated)
  public topRated: Emittable<Result[]>;

  @Emitter(MainState.updateMyList)
  public myList: Emittable<string[]>;


  public onAir$: Observable<Result[]>;
  constructor(private tvSrv: TvService) { }

  ngOnInit() {
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

    this.onAir$ = this.tvSrv.getOnAir();
  }

}
