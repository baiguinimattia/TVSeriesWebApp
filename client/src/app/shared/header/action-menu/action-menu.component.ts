import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { MainState } from 'src/app/state/state/main.state';
import { Observable, interval } from 'rxjs';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css']
})
export class ActionMenuComponent implements OnInit {
  @Select(MainState.menuState) state$: Observable<boolean>;
  @Emitter(MainState.setMenuState)
  public setState: Emittable<boolean>;
  public showAnimation: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleState(state: boolean) {
    if(!state){
      this.showAnimation = true;
      interval(1000).pipe(take(1)).subscribe(
        response => {
          this.showAnimation = false;
          this.setState.emit(state);
        },
      )
    } else {
      this.setState.emit(state)
    }

  }

}
