import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/state/state/auth.state';
import { tap } from 'rxjs/operators';
import { Logout } from 'src/app/state/actions/auth.action';
import { Emitter, Emittable } from '@ngxs-labs/emitter';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  public authStatus: boolean;
  @Emitter(AuthState.logout)
  public logoutEvent: Emittable;

  constructor(private route: ActivatedRoute, private store: Store,
    private router: Router, private readonly toastr: ToastrService) {
    this.authStatus = false;
  }

  ngOnInit() {
    this.store.select(AuthState.isAuthenticated).pipe(
      tap( (result) => this.authStatus = result),
    ).subscribe();
  }

  public logout(): void {
    this.logoutEvent.emit();
  }

}
