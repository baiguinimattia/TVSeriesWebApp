import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Router } from '@angular/router';
import { Logout } from './state/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private actions: Actions, private router: Router) {

  }

  ngOnInit() {
    this.actions.pipe(ofActionDispatched(Logout)).subscribe( () => {
      this.router.navigate(['/login']);
    });
  }

}
