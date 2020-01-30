import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { MainState } from '../state/state/main.state';
import { Observable } from 'rxjs';
import { TvService } from '../data-layer/tv.service';
import { tap } from 'rxjs/operators';
import { Emitter, Emittable } from '@ngxs-labs/emitter';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {
  @Select(MainState.myList) myList$: Observable<string[]>;
  @Emitter(MainState.updateMyList)
  public updateList: Emittable<string[]>;
  constructor(private tvService: TvService) { }

  ngOnInit() {
    this.tvService.getMyList().pipe(
      tap( response => this.updateList.emit(response))
    ).subscribe();
  }

}
