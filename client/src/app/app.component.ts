import { Component, OnInit } from '@angular/core';
import { Actions } from '@ngxs/store';
import { Router } from '@angular/router';
import { AuthState } from './state/state/auth.state';
import {
  ofEmittableDispatched
} from '@ngxs-labs/emitter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(private actions: Actions, private router: Router) { }

  ngOnInit() {
    this.actions.pipe(ofEmittableDispatched(AuthState.logout)).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
