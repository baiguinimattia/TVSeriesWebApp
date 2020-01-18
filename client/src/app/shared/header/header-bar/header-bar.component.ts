import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/state/state/auth.state';
import { tap } from 'rxjs/operators';
import { Logout } from 'src/app/state/actions/auth.action';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  authStatus: boolean;
  constructor(private route: ActivatedRoute, private store: Store,
    private router: Router, private readonly toastr: ToastrService) {
    this.authStatus = false;
  }

  ngOnInit() {
    this.authStatus = this.store.selectSnapshot(AuthState.isAuthenticated);
    console.log(this.store.selectSnapshot(AuthState.isAuthenticated));

    this.store.select(AuthState.isAuthenticated).pipe(
      tap( (result) => this.authStatus = result),
    ).subscribe();
  }

  logout() {
    console.log(`dispatch`);
    this.store.dispatch(new Logout()).subscribe();
  }

}
