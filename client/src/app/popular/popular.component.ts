import { Component, OnInit } from '@angular/core';
import { PopularService } from './popular.service';
import { tap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { MainState } from '../state/state/main.state';
import { Observable } from 'rxjs';
import { Result } from '../interfaces/popular.interface';
import { Emitter, Emittable } from '@ngxs-labs/emitter';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  @Select(MainState.popular) popular$: Observable<Result[]>;
  @Emitter(MainState.setPopular)
  public popular: Emittable<Result[]>;

  constructor(private readonly popSrv: PopularService) { }

  ngOnInit() {
  }

}
